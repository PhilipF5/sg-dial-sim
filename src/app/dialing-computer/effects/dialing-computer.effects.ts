import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { of } from "rxjs";
import { delay, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { DialingComputerActions, DialingComputerActionTypes } from "app/dialing-computer/actions";
import { getAddress, getDestination, getNextChevron, getNextGlyph } from "app/dialing-computer/selectors";
import { AlertService, GateNetworkService } from "app/shared/services";

@Injectable()
export class DialingComputerEffects {
	@Effect()
	dialFirstGlyph$ = this.actions$.pipe(
		ofType<DialingComputerActions.BeginDialing>(DialingComputerActionTypes.BeginDialing),
		switchMap(() => of(new DialingComputerActions.DialNextGlyph()))
	);

	@Effect()
	onChevronEngaged$ = this.actions$.pipe(
		ofType<DialingComputerActions.ChevronEngaged>(DialingComputerActionTypes.ChevronEngaged),
		withLatestFrom(this.store$.pipe(select(getNextGlyph))),
		switchMap(([_, glyph]) =>
			of(!!glyph ? new DialingComputerActions.DialNextGlyph() : new DialingComputerActions.SequenceComplete())
		)
	);

	@Effect()
	onChevronFailed$ = this.actions$.pipe(
		ofType<DialingComputerActions.ChevronFailed>(DialingComputerActionTypes.ChevronFailed),
		switchMap(() => of(new DialingComputerActions.SequenceFailed()))
	);

	@Effect()
	onGlyphReady$ = this.actions$.pipe(
		ofType<DialingComputerActions.GlyphReady>(DialingComputerActionTypes.GlyphReady),
		switchMap(({ payload }) => of(new DialingComputerActions.TryEngageChevron(payload)))
	);

	@Effect()
	onSequenceComplete$ = this.actions$.pipe(
		ofType<DialingComputerActions.SequenceComplete>(DialingComputerActionTypes.SequenceComplete),
		switchMap(() => of(new DialingComputerActions.OpenGate())),
		delay(2000)
	);

	@Effect()
	onSequenceFailed$ = this.actions$.pipe(
		ofType<DialingComputerActions.SequenceFailed>(DialingComputerActionTypes.SequenceFailed),
		tap(() =>
			this.alert.alerts.next({
				critical: true,
				duration: 7000,
				message: "404 Not Found",
				title: "Cannot Establish Connection",
			})
		),
		switchMap(() => of(new DialingComputerActions.AbortDialing())),
		delay(7000)
	);

	@Effect()
	startRingSpin$ = this.actions$.pipe(
		ofType<DialingComputerActions.DialNextGlyph>(DialingComputerActionTypes.DialNextGlyph),
		withLatestFrom(this.store$.pipe(select(getNextGlyph)), this.store$.pipe(select(getNextChevron))),
		switchMap(([_, glyph, chevron]) => of(new DialingComputerActions.SpinRing({ chevron, glyph })))
	);

	@Effect()
	tryEngageChevron$ = this.actions$.pipe(
		ofType<DialingComputerActions.TryEngageChevron>(DialingComputerActionTypes.TryEngageChevron),
		withLatestFrom(this.store$.pipe(select(getAddress))),
		switchMap(([{ payload }, address]) => {
			if (payload.chevron === 7) {
				let destination = this.gateNetwork.getActiveAddress(address);
				if (!!destination) {
					return [
						new DialingComputerActions.EngageChevron(payload),
						new DialingComputerActions.EstablishConnection({ destination }),
					];
				} else {
					return of(new DialingComputerActions.FailChevron(payload));
				}
			} else {
				return of(new DialingComputerActions.EngageChevron(payload));
			}
		})
	);

	constructor(
		private actions$: Actions,
		private alert: AlertService,
		private gateNetwork: GateNetworkService,
		private store$: Store<any>
	) {}
}

export const EFFECTS = [DialingComputerEffects];
