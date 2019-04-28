import { TimelineLite } from "gsap";
import { Destination, GateStatus } from "app/shared/models";

export interface DialingComputerState {
	destination: Destination;
	dialingSequence: TimelineLite;
	gateStatus: GateStatus;
}
