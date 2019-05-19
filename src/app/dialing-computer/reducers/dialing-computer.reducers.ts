import {
	DialingComputerAction,
	DialingComputerActions,
	DialingComputerActionTypes,
} from "app/dialing-computer/actions";
import { DialingComputerState } from "app/dialing-computer/state";
import { GateStatus, Glyphs } from "app/shared/models";

export const initialState: DialingComputerState = {
	address: null,
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
		case DialingComputerActionTypes.ChevronEngaged:
			let nextSymbol = !!state.address[state.nextSymbol + 1] ? state.nextSymbol + 1 : null;
			return { ...state, nextSymbol };
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
		default:
			return state;
	}
}
