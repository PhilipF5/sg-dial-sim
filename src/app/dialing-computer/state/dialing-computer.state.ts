import { ChevronStatuses, Destination, GateStatus, Glyph } from "app/shared/models";

export interface DialingComputerState {
	address: Glyph[];
	chevronStatus: ChevronStatuses;
	destination: Destination;
	gateStatus: GateStatus;
	nextSymbol: number;
}
