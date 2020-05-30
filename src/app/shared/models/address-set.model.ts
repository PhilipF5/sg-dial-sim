import { Destination } from "./destination.model";

export class AddressSet {
	public destinations: Destination[];
	public enabled: boolean;
	public name: string;

	public constructor(init?: Partial<AddressSet>) {
		Object.assign(this, init);
	}
}
