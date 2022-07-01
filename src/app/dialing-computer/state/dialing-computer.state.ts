import { ChevronStatuses, Destination, GateStatus, Glyph, IrisStatus, User } from "app/shared/models";

export interface DialingComputerState {
	address: Glyph[];
	chevronStatus: ChevronStatuses;
	destination: Destination;
	gateStatus: GateStatus;
	irisStatus: IrisStatus;
	nextSymbol: number;
	user: User;
}
