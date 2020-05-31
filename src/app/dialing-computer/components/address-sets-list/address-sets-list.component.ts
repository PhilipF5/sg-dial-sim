import { Component, OnInit } from "@angular/core";
import { AddressSet } from "app/shared/models/address-set.model";
import { GateNetworkService } from "app/shared/services";

@Component({
	selector: "sg-address-sets-list",
	templateUrl: "./address-sets-list.component.html",
	styleUrls: ["./address-sets-list.component.scss"],
})
export class AddressSetsListComponent implements OnInit {
	public addressSets: Readonly<AddressSet>[];
	public newSet: string = "";

	public constructor(private gateNetwork: GateNetworkService) {}

	ngOnInit() {
		this.addressSets = this.gateNetwork.getAddressSets();
	}

	public onNewKeydown(event: KeyboardEvent): void {
		if (event.key.match(/^[A-Z ]$/i) && this.newSet.length < 10) {
			this.newSet += event.key;
		} else if (event.key === "Backspace" && this.newSet.length > 0) {
			this.newSet = this.newSet.substring(0, this.newSet.length - 1);
		}
	}
}
