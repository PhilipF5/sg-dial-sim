import {
	DialingComputerAction,
	DialingComputerActions,
	DialingComputerActionTypes,
} from "app/dialing-computer/actions";
import { DialingComputerState } from "app/dialing-computer/state";
import { ChevronStatus, DefaultChevronStatuses, GateStatus, Glyphs } from "app/shared/models";

export const initialState: DialingComputerState = {
	address: null,
	chevronStatus: DefaultChevronStatuses[7],
	currentAnimation: null,
	destination: null,
	gateStatus: GateStatus.Idle,
	nextSymbol: null,
};

export function dialingComputerReducer(state = initialState, action: DialingComputerAction) {
	switch (action.type) {
		case DialingComputerActionTypes.AbortDialing:
			return { ...state, gateStatus: GateStatus.Aborted };
		case DialingComputerActionTypes.BeginDialing:
			return { ...state, address: [...action.payload.address, Glyphs.pointOfOrigin], nextSymbol: 0 };
		case DialingComputerActionTypes.ChevronEngaged: {
			let nextSymbol = !!state.address[state.nextSymbol + 1] ? state.nextSymbol + 1 : null;
			let chevronStatus = { ...state.chevronStatus, [action.payload.chevron]: ChevronStatus.Engaged };
			return { ...state, nextSymbol, chevronStatus };
		}
		case DialingComputerActionTypes.ChevronFailed: {
			let chevronStatus = { ...state.chevronStatus, [action.payload.chevron]: ChevronStatus.Failed };
			return { ...state, chevronStatus };
		}
		case DialingComputerActionTypes.DialNextGlyph:
			return { ...state, gateStatus: GateStatus.Dialing };
		case DialingComputerActionTypes.EngageChevron:
			return { ...state, gateStatus: GateStatus.Engaged };
		case DialingComputerActionTypes.EstablishConnection:
			return { ...state, destination: action.payload.destination };
		case DialingComputerActionTypes.OpenGate:
			return { ...state, gateStatus: GateStatus.Active };
		case DialingComputerActionTypes.Reset:
			return { ...initialState };
		case DialingComputerActionTypes.ShutdownGate:
			return { ...state, gateStatus: GateStatus.Shutdown };
		default:
			return state;
	}
}
