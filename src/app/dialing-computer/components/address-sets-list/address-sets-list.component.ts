import { Component, OnInit, ViewChild } from "@angular/core";
import { SegmentDisplayComponent } from "app/shared/components";
import { AddressSet } from "app/shared/models/address-set.model";
import { AlertService, GateNetworkService } from "app/shared/services";

@Component({
	selector: "sg-address-sets-list",
	templateUrl: "./address-sets-list.component.html",
	styleUrls: ["./address-sets-list.component.scss"],
})
export class AddressSetsListComponent implements OnInit {
	public addressSets: Readonly<AddressSet>[];
	public newSet: string = "";

	@ViewChild(SegmentDisplayComponent, { static: true }) newField: SegmentDisplayComponent;

	public constructor(private alert: AlertService, private gateNetwork: GateNetworkService) {}

	ngOnInit() {
		this.updateAddressSets();
	}

	public onDeleteClick(name: string): void {
		this.deleteAddressSet(name);
	}

	public onNewClick(): void {
		this.createAddressSet();
	}

	public onNewKeydown(event: KeyboardEvent): void {
		if (event.key.match(/^[A-Z ]$/i) && this.newSet.length < 10) {
			this.newSet += event.key;
		} else if (event.key === "Backspace" && this.newSet.length > 0) {
			this.newSet = this.newSet.substring(0, this.newSet.length - 1);
		} else if (event.key === "Enter") {
			this.createAddressSet();
		}
	}

	private createAddressSet(): void {
		if (this.newSet.trim()) {
			this.gateNetwork.createAddressSet(this.newSet);
			this.newSet = "";
			this.newField.elem.blur();
			this.updateAddressSets();
		}
	}

	private deleteAddressSet(name: string): void {
		if (name === "Default") {
			this.alert.alerts.next({
				critical: true,
				duration: 4000,
				message: "Invalid Operation",
				title: "Cannot delete default source",
			});
		} else {
			this.gateNetwork.deleteAddressSet(name);
			this.updateAddressSets();
		}
	}

	private updateAddressSets(): void {
		this.addressSets = this.gateNetwork.getAddressSets();
	}
}
