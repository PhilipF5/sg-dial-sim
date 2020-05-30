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
	public constructor(private gateNetwork: GateNetworkService) {}

	ngOnInit() {
		this.addressSets = this.gateNetwork.getAddressSets();
	}
}
