import { Injectable } from "@angular/core";
import { DefaultAddressSet, Destination, Glyph, Glyphs } from "app/shared/models";
import { AddressSet } from "app/shared/models/address-set.model";
import { isEqual, orderBy, uniqWith } from "lodash-es";
import { ElectronService } from "./electron.service";

@Injectable()
export class GateNetworkService {
	private addressSets: AddressSet[];

	constructor(private electron: ElectronService) {
		this.initAddressSets();
	}

	public createAddressSet(name: string): void {
		if (this.addressSets.find((set) => set.name === name)) {
			throw new Error("Address set with this name already exists");
		}
		this.addressSets.push(new AddressSet({ destinations: [], enabled: true, name }));
		this.saveAddressSets();
	}

	public createDestination(model: Destination): void {
		this.addressSets.find((set) => set.name === model.name).destinations.push(model);
	}

	public deleteAddressSet(name: string): void {
		this.addressSets = this.addressSets.filter((set) => set.name !== name);
		this.saveAddressSets();
	}

	public deleteDestination(dest: Destination): void {
		const set = this.addressSets.find((set) => set.name === dest.set);
		const destIndex = set.destinations.findIndex((d) => d.id === dest.id);
		set.destinations.splice(destIndex, 1);
	}

	public getActiveAddress(address: Glyph[]): Destination {
		return address.length < 7 ? null : this.getDestinationByAddress(address);
	}

	public getAddressSets(): Readonly<AddressSet>[] {
		return [...this.addressSets];
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

	public getDestinationByAddress(address: Glyph[], set?: string): Destination {
		const stringAddress = this.stringifyAddress(
			address.filter(({ position }) => position !== Glyphs.pointOfOrigin.position),
		);
		const destinations = set ? this.getAllAddresses().filter((d) => d.set === set) : this.getAllAddresses();
		return destinations.find(({ address }) => this.stringifyAddress(address) === stringAddress);
	}

	public getDestinationById(id: number): Destination {
		return DefaultAddressSet.find((d) => d.id === id);
	}

	public moveAddressSetDown(name: string): void {
		const index = this.addressSets.findIndex((set) => set.name === name);
		if (index !== this.addressSets.length - 1) {
			[this.addressSets[index + 1], this.addressSets[index]] = [
				this.addressSets[index],
				this.addressSets[index + 1],
			];
		}
		this.saveAddressSets();
	}

	public moveAddressSetUp(name: string): void {
		const index = this.addressSets.findIndex((set) => set.name === name);
		if (index !== 0) {
			[this.addressSets[index - 1], this.addressSets[index]] = [
				this.addressSets[index],
				this.addressSets[index - 1],
			];
		}
		this.saveAddressSets();
	}

	public renameAddressSet(oldName: string, newName: string): void {
		this.addressSets.find((set) => set.name === oldName).name = newName;
		this.saveAddressSets();
	}

	public saveDestination(dest: Destination): void {
		const set = this.addressSets.find((set) => set.name === dest.set);
		if (dest.id) {
			const index = set.destinations.findIndex((d) => d.id === dest.id);
			set.destinations.splice(index, 1, dest);
		} else {
			set.destinations.push(dest);
		}
		this.saveAddressSets();
	}

	public toggleAddressSet(name: string): void {
		const set = this.addressSets.find((set) => set.name === name);
		set.enabled = !set.enabled;
		this.saveAddressSets();
	}

	private async initAddressSets(): Promise<void> {
		const setsFromStorage: Partial<AddressSet>[] = await this.electron.get("addressSets");
		if (!setsFromStorage) {
			this.addressSets = [new AddressSet({ destinations: DefaultAddressSet, enabled: true, name: "Default" })];
			this.saveAddressSets();
		} else {
			this.addressSets = setsFromStorage.map((set) => new AddressSet(set));
		}
	}

	private saveAddressSets(): void {
		this.electron.set("addressSets", this.addressSets);
	}

	private stringifyAddress(address: Glyph[]): string {
		return address.map((glyph) => glyph.position).join("-");
	}
}
