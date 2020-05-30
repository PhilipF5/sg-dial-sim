import { Injectable } from "@angular/core";
import { AddressSet, DefaultAddressSet, Destination, Glyph } from "app/shared/models";
import { isEqual, orderBy, uniqWith } from "lodash";
import { ElectronStoreService } from "./electron-store.service";

@Injectable()
export class GateNetworkService {
	private addressSets: AddressSet[];

	constructor(private electronStore: ElectronStoreService) {
		this.initAddressSets();
	}

	public createAddressSet(name: string): void {
		if (this.addressSets.find((set) => set.name === name)) {
			throw new Error("Address set with this name already exists");
		}
		this.addressSets.push({ destinations: [], enabled: true, name });
		this.saveAddressSets();
	}

	public deleteAddressSet(name: string): void {
		this.addressSets = this.addressSets.filter((set) => set.name !== name);
		this.saveAddressSets();
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
		return orderBy(
			uniqWith(addresses, (value, other) => isEqual(value.address, other.address)),
			[
				(d: Destination) => d.name === "Unknown",
				(d: Destination) => !!d.name.match(/^[\d\w]{3}-[\d\w]{3,4}$/),
				(d: Destination) => d.address.length,
				(d: Destination) => d.name,
				(d: Destination) => d.desc,
			],
		);
	}

	public getDestinationById(id: number): Destination {
		return DefaultAddressSet.find((d) => d.id === id);
	}

	public toggleAddressSet(name: string): void {
		const set = this.addressSets.find((set) => set.name === name);
		set.enabled = !set.enabled;
		this.saveAddressSets();
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
