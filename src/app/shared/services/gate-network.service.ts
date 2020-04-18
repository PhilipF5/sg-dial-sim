import { Injectable } from "@angular/core";
import { AddressSet, DefaultAddressSet, Destination, Glyph } from "app/shared/models";
import Store from "electron-store";
import { isEqual, uniqWith } from "lodash";

@Injectable()
export class GateNetworkService {
	private addressSets: AddressSet[];
	private electronStore: Store = new Store();

	constructor() {
		const setsFromStorage = this.electronStore.get("addressSets");
		if (!setsFromStorage) {
			this.addressSets = [{ destinations: DefaultAddressSet, enabled: true, name: "Default" }];
			this.saveAddressSets();
		} else {
			this.addressSets = setsFromStorage;
		}
	}

	public getActiveAddress(address: Glyph[]): Destination {
		if (address.length < 7) {
			return null;
		}

		let sixSymbolMatches = this.getAllAddresses();
		for (let i = 0; i < 6; i++) {
			sixSymbolMatches = sixSymbolMatches.filter((d) => d.address[i].position === address[i].position);
		}

		if (sixSymbolMatches.length === 0) {
			return null;
		} else if (address.length === 7) {
			return sixSymbolMatches.filter((m) => m.address.length === 6)[0];
		}
	}

	public getAllAddresses(): Destination[] {
		const addresses = this.addressSets.reduce(
			(addresses: Destination[], set: AddressSet) => addresses.concat(set.destinations),
			[],
		);
		return uniqWith(addresses, (value, other) => isEqual(value.address, other.address));
	}

	public getDestinationById(id: number): Destination {
		return DefaultAddressSet.find((d) => d.id === id);
	}

	private saveAddressSets(): void {
		this.electronStore.set("addressSets", this.addressSets);
	}
}
