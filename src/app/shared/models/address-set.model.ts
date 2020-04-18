import { Destination } from "./destination.model";

export interface AddressSet {
	destinations: Destination[];
	enabled: boolean;
	name: string;
}
