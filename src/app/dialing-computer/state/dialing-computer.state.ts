import { ChevronStatuses, Destination, GateStatus, Glyph } from "app/shared/models";
import { TimelineLite } from "gsap";

export interface DialingComputerState {
	address: Glyph[];
	chevronStatus: ChevronStatuses;
	currentAnimation: TimelineLite;
	destination: Destination;
	gateStatus: GateStatus;
	nextSymbol: number;
}
