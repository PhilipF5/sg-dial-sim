import {
	DialingComputerAction,
	DialingComputerActions,
	DialingComputerActionTypes,
} from "app/dialing-computer/actions";
import { DialingComputerState } from "app/dialing-computer/state";
import { GateStatus } from "app/shared/models";

export const initialState: DialingComputerState = {
	address: null,
	currentAnimation: null,
	destination: null,
	gateStatus: GateStatus.Idle,
	nextSymbol: null,
};

export function dialingComputerReducer(state = initialState, action: DialingComputerAction) {
	switch (action.type) {
		case DialingComputerActionTypes.BeginDialing:
			return { ...state, address: [...action.payload.address], gateStatus: GateStatus.Dialing, nextSymbol: 0 };
		default:
			return state;
	}
}
