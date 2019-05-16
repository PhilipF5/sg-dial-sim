import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store, select } from "@ngrx/store";
import { of } from "rxjs";
import { catchError, map, mergeMap, switchMap, take, withLatestFrom } from "rxjs/operators";
import { DialingComputerActions, DialingComputerActionTypes } from "app/dialing-computer/actions";
import { getNextChevron, getNextGlyph } from "app/dialing-computer/selectors";

@Injectable()
export class DialingComputerEffects {
	@Effect()
	dialFirstGlyph$ = this.actions$.pipe(
		ofType<DialingComputerActions.BeginDialing>(DialingComputerActionTypes.BeginDialing),
		switchMap(() => of(new DialingComputerActions.DialNextGlyph()))
	);

	@Effect()
	startRingSpin$ = this.actions$.pipe(
		ofType<DialingComputerActions.DialNextGlyph>(DialingComputerActionTypes.DialNextGlyph),
		withLatestFrom(this.store.pipe(select(getNextGlyph)), this.store.pipe(select(getNextChevron))),
		switchMap(([action, glyph, chevron]) => of(new DialingComputerActions.SpinRing({ chevron, glyph })))
	);

	constructor(private actions$: Actions, private store: Store<any>) {}
}

export const EFFECTS = [DialingComputerEffects];
