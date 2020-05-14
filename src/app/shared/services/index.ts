import { AlertService } from "./alert.service";
import { AudioService } from "./audio.service";
import { ElectronStoreService } from "./electron-store.service";
import { GateNetworkService } from "./gate-network.service";

export { AlertService } from "./alert.service";
export { AudioService } from "./audio.service";
export { ElectronStoreService } from "./electron-store.service";
export { GateNetworkService } from "./gate-network.service";

export const SERVICES = [AlertService, AudioService, ElectronStoreService, GateNetworkService];
