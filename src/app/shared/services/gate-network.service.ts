import { Injectable } from "@angular/core";
import { AddressSet, DefaultAddressSet, Destination, Glyph } from "app/shared/models";
import { isEqual, uniqWith } from "lodash";
import { ElectronStoreService } from "./electron-store.service";

@Injectable()
export class GateNetworkService {
	private addressSets: AddressSet[];

	constructor(private electronStore: ElectronStoreService) {
		this.initAddressSets();
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
		const addresses = this.addressSets
			.filter((set: AddressSet) => set.enabled)
			.reduce(
				(addresses: Destination[], set: AddressSet) =>
					addresses.concat(set.destinations.map((d) => ({ ...d, set: set.name }))),
				[],
			);
		return uniqWith(addresses, (value, other) => isEqual(value.address, other.address));
	}

	public getDestinationById(id: number): Destination {
		return DefaultAddressSet.find((d) => d.id === id);
	}

	private async initAddressSets(): Promise<void> {
		const setsFromStorage = await this.electronStore.get("addressSets");
		if (!setsFromStorage) {
			this.addressSets = [{ destinations: DefaultAddressSet, enabled: true, name: "Default" }];
			this.saveAddressSets();
		} else {
			this.addressSets = setsFromStorage;
		}
	}

	private saveAddressSets(): void {
		this.electronStore.set("addressSets", this.addressSets);
	}
}
