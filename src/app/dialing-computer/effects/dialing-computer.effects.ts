import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
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
import { Sound } from "app/shared/models";
import { AlertService, AudioService, GateNetworkService } from "app/shared/services";
import { of } from "rxjs";
import { delay, switchMap, tap, withLatestFrom } from "rxjs/operators";

@Injectable()
export class DialingComputerEffects {
	dialFirstGlyph$ = createEffect(() =>
		this.actions$.pipe(
			ofType(beginDialing),
			switchMap(() => of(dialNextGlyph())),
		),
	);

	onChevronEngaged$ = createEffect(() =>
		this.actions$.pipe(
			ofType(chevronEngaged),
			tap(() => this.audio.play(Sound.SymbolEngaged)),
			delay(1000),
			withLatestFrom(this.store$.pipe(select(getNextGlyph))),
			switchMap(([_, glyph]) => of(!!glyph ? dialNextGlyph() : sequenceComplete())),
		),
	);

	onChevronFailed$ = createEffect(() =>
		this.actions$.pipe(
			ofType(chevronFailed),
			switchMap(() => of(sequenceFailed())),
		),
	);

	onGlyphReady$ = createEffect(() =>
		this.actions$.pipe(
			ofType(glyphReady),
			switchMap(({ chevron, glyph }) => of(tryEngageChevron(chevron, glyph))),
		),
	);

	onSequenceComplete$ = createEffect(() =>
		this.actions$.pipe(
			ofType(sequenceComplete),
			switchMap(() => of(openGate())),
			delay(2000),
		),
	);

	onSequenceFailed$ = createEffect(() =>
		this.actions$.pipe(
			ofType(sequenceFailed),
			tap(() =>
				this.alert.alerts.next({
					duration: 7000,
					title: "404 Not Found",
					text1: "Cannot Establish Connection",
				}),
			),
			switchMap(() => of(abortDialing())),
			delay(7000),
		),
	);

	resetOnGateClose$ = createEffect(() =>
		this.actions$.pipe(
			ofType(gateClosed),
			switchMap(() => of(reset())),
		),
	);

	startRingSpin$ = createEffect(() =>
		this.actions$.pipe(
			ofType(dialNextGlyph),
			withLatestFrom(this.store$.pipe(select(getNextGlyph)), this.store$.pipe(select(getNextChevron))),
			switchMap(([_, glyph, chevron]) => of(spinRing(chevron, glyph))),
		),
	);

	tryEngageChevron$ = createEffect(() =>
		this.actions$.pipe(
			ofType(tryEngageChevron),
			withLatestFrom(this.store$.pipe(select(getAddress))),
			switchMap(([{ chevron, glyph }, address]) => {
				if (chevron === address.length) {
					let destination = this.gateNetwork.getActiveAddress(address);
					if (!!destination) {
						return [engageChevron(chevron, glyph), establishConnection(destination)];
					} else {
						return of(failChevron(chevron, glyph));
					}
				} else {
					return of(engageChevron(chevron, glyph));
				}
			}),
		),
	);

	constructor(
		private actions$: Actions,
		private alert: AlertService,
		private audio: AudioService,
		private gateNetwork: GateNetworkService,
		private store$: Store<any>,
	) {}
}

export const EFFECTS = [DialingComputerEffects];
