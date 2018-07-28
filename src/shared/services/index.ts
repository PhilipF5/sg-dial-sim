import { AudioService } from "./audio.service";
import { GateNetworkService } from "./gate-network.service";
import { GateStatusService } from "./gate-status.service";

export { AudioService } from "./audio.service";
export { GateNetworkService } from "./gate-network.service";
export { GateStatusService } from "./gate-status.service";

export const SERVICES = [AudioService, GateNetworkService, GateStatusService];
