import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DialingComputerState } from "app/dialing-computer/state";

export const selectDialingComputerState = createFeatureSelector<DialingComputerState>("dialingComputer");

export const getAddress = createSelector(
	selectDialingComputerState,
	state => state.address
);

export const getAddressGlyphAtIndex = (index: number) =>
	createSelector(
		selectDialingComputerState,
		state => state.address[index]
	);

export const getChevronStatus = createSelector(
	selectDialingComputerState,
	state => state.chevronStatus
);

export const getDestination = createSelector(
	selectDialingComputerState,
	state => state.destination
);

export const getGateStatus = createSelector(
	selectDialingComputerState,
	state => state.gateStatus
);

export const getNextChevron = createSelector(
	selectDialingComputerState,
	state => state.nextSymbol + 1
);

export const getNextGlyph = createSelector(
	selectDialingComputerState,
	state => state && state.address && state.address[state.nextSymbol]
);
