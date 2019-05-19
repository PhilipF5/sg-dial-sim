import { TimelineLite } from "gsap";
import { ChevronStatuses, Destination, GateStatus, Glyph } from "app/shared/models";

export interface DialingComputerState {
	address: Glyph[];
	chevronStatus: ChevronStatuses;
	currentAnimation: TimelineLite;
	destination: Destination;
	gateStatus: GateStatus;
	nextSymbol: number;
}
