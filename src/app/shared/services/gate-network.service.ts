import { Injectable } from "@angular/core";
import { DefaultAddressSet, Destination, Glyph } from "app/shared/models";

@Injectable()
export class GateNetworkService {
	public getActiveAddress(address: Glyph[]): Destination {
		if (address.length < 7) {
			return null;
		}

		let sixSymbolMatches = DefaultAddressSet.filter(d => d.address[0].position === address[0].position)
			.filter(d => d.address[1].position === address[1].position)
			.filter(d => d.address[2].position === address[2].position)
			.filter(d => d.address[3].position === address[3].position)
			.filter(d => d.address[4].position === address[4].position)
			.filter(d => d.address[5].position === address[5].position);

		if (sixSymbolMatches.length === 0) {
			return null;
		} else if (address.length === 7) {
			return sixSymbolMatches.filter(m => m.address.length === 6)[0];
		}
	}

	public getAllAddresses(): Destination[] {
		return DefaultAddressSet;
	}

	public getDestinationById(id: number): Destination {
		return DefaultAddressSet.find(d => d.id === id);
	}
}
