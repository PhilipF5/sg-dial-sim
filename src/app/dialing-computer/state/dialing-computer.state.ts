import { TimelineLite } from "gsap";
import { Destination, GateStatus, Glyph } from "app/shared/models";

export interface DialingComputerState {
	address: Glyph[];
	currentAnimation: TimelineLite;
	destination: Destination;
	gateStatus: GateStatus;
	nextSymbol: number;
}
