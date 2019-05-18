import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DialingComputerState } from "app/dialing-computer/state";

export const selectDialingComputerState = createFeatureSelector<DialingComputerState>("dialingComputer");

export const getAddressGlyphAtIndex = (index: number) =>
	createSelector(
		selectDialingComputerState,
		state => state.address[index]
	);

export const getNextChevron = createSelector(
	selectDialingComputerState,
	state => state.nextSymbol + 1
);

export const getNextGlyph = createSelector(
	selectDialingComputerState,
	state => state && state.address && state.address[state.nextSymbol]
);
