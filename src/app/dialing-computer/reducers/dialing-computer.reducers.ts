import { Action, createReducer, on } from "@ngrx/store";
import {
	abortDialing,
	beginDialing,
	chevronEngaged,
	chevronFailed,
	closeIris,
	dialNextGlyph,
	engageChevron,
	establishConnection,
	irisClosed,
	irisOpened,
	openGate,
	openIris,
	reset,
	setDestination,
	shutdownGate,
} from "app/dialing-computer/actions";
import { DialingComputerState } from "app/dialing-computer/state";
import { ChevronStatus, DefaultChevronStatuses, GateStatus, Glyphs, IrisStatus, User } from "app/shared/models";

export const initialState: DialingComputerState = {
	address: null,
	chevronStatus: DefaultChevronStatuses[7],
	destination: null,
	gateStatus: GateStatus.Idle,
	irisStatus: IrisStatus.Open,
	nextSymbol: null,
	user: User.Default(),
};

export const reducer = createReducer(
	initialState,
	on(abortDialing, (state) => ({ ...state, gateStatus: GateStatus.Aborted })),
	on(beginDialing, (state, { address }) => ({
		...state,
		address: [...address, Glyphs.pointOfOrigin],
		nextSymbol: 0,
	})),
	on(chevronEngaged, (state, { chevron }) => {
		let nextSymbol = !!state.address[state.nextSymbol + 1] ? state.nextSymbol + 1 : null;
		let chevronStatus = {
			...state.chevronStatus,
			[chevron]: ChevronStatus.Engaged,
		};
		return { ...state, nextSymbol, chevronStatus };
	}),
	on(chevronFailed, (state, { chevron }) => {
		let chevronStatus = {
			...state.chevronStatus,
			[chevron]: ChevronStatus.Failed,
		};
		return { ...state, chevronStatus };
	}),
	on(closeIris, (state) => ({ ...state, irisStatus: IrisStatus.Closing })),
	on(dialNextGlyph, (state) => ({ ...state, gateStatus: GateStatus.Dialing })),
	on(engageChevron, (state) => ({ ...state, gateStatus: GateStatus.Engaged })),
	on(establishConnection, (state, { destination }) => ({ ...state, destination })),
	on(irisClosed, (state) => ({ ...state, irisStatus: IrisStatus.Closed })),
	on(irisOpened, (state) => ({ ...state, irisStatus: IrisStatus.Open })),
	on(openGate, (state) => ({ ...state, gateStatus: GateStatus.Active })),
	on(openIris, (state) => ({ ...state, irisStatus: IrisStatus.Opening })),
	on(reset, () => ({ ...initialState })),
	on(setDestination, (state, { destination }) => ({ ...state, destination })),
	on(shutdownGate, (state) => ({ ...state, gateStatus: GateStatus.Shutdown })),
);

export function dialingComputerReducer(state: DialingComputerState | undefined, action: Action) {
	return reducer(state, action);
}
