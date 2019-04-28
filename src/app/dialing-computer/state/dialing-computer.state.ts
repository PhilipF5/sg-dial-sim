import { TimelineLite } from "gsap";
import { Destination, GateStatus, Glyph } from "app/shared/models";

export interface DialingComputerState {
	currentAnimation: TimelineLite;
	destination: Destination;
	gateStatus: GateStatus;
	nextSymbol: Glyph;
}
