import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import {
	abortDialing,
	beginDialing,
	chevronEngaged,
	chevronFailed,
	dialNextGlyph,
	engageChevron,
	establishConnection,
	failChevron,
	gateClosed,
	glyphReady,
	openGate,
	reset,
	sequenceComplete,
	sequenceFailed,
	spinRing,
	tryEngageChevron,
} from "app/dialing-computer/actions";
import { getAddress, getNextChevron, getNextGlyph } from "app/dialing-computer/selectors";
import { AlertService, GateNetworkService } from "app/shared/services";
import { of } from "rxjs";
import { delay, switchMap, tap, withLatestFrom } from "rxjs/operators";

@Injectable()
export class DialingComputerEffects {
	@Effect()
	dialFirstGlyph$ = this.actions$.pipe(
		ofType(beginDialing),
		switchMap(() => of(dialNextGlyph()))
	);

	@Effect()
	onChevronEngaged$ = this.actions$.pipe(
		ofType(chevronEngaged),
		withLatestFrom(this.store$.pipe(select(getNextGlyph))),
		switchMap(([_, glyph]) => of(!!glyph ? dialNextGlyph() : sequenceComplete()))
	);

	@Effect()
	onChevronFailed$ = this.actions$.pipe(
		ofType(chevronFailed),
		switchMap(() => of(sequenceFailed()))
	);

	@Effect()
	onGlyphReady$ = this.actions$.pipe(
		ofType(glyphReady),
		switchMap(payload => of(tryEngageChevron(payload)))
	);

	@Effect()
	onSequenceComplete$ = this.actions$.pipe(
		ofType(sequenceComplete),
		switchMap(() => of(openGate())),
		delay(2000)
	);

	@Effect()
	onSequenceFailed$ = this.actions$.pipe(
		ofType(sequenceFailed),
		tap(() =>
			this.alert.alerts.next({
				critical: true,
				duration: 7000,
				message: "404 Not Found",
				title: "Cannot Establish Connection",
			})
		),
		switchMap(() => of(abortDialing())),
		delay(7000)
	);

	@Effect()
	resetOnGateClose$ = this.actions$.pipe(
		ofType(gateClosed),
		switchMap(() => of(reset()))
	);

	@Effect()
	startRingSpin$ = this.actions$.pipe(
		ofType(dialNextGlyph),
		withLatestFrom(this.store$.pipe(select(getNextGlyph)), this.store$.pipe(select(getNextChevron))),
		switchMap(([_, glyph, chevron]) => of(spinRing({ chevron, glyph })))
	);

	@Effect()
	tryEngageChevron$ = this.actions$.pipe(
		ofType(tryEngageChevron),
		withLatestFrom(this.store$.pipe(select(getAddress))),
		switchMap(([payload, address]) => {
			if (payload.chevron === 7) {
				let destination = this.gateNetwork.getActiveAddress(address);
				if (!!destination) {
					return [engageChevron(payload), establishConnection({ destination })];
				} else {
					return of(failChevron(payload));
				}
			} else {
				return of(engageChevron(payload));
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
