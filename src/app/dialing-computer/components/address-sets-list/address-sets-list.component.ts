import { Component, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { SegmentDisplayComponent } from "app/shared/components";
import { AddressSet } from "app/shared/models/address-set.model";
import { AlertService, GateNetworkService } from "app/shared/services";

@Component({
	selector: "sg-address-sets-list",
	templateUrl: "./address-sets-list.component.html",
	styleUrls: ["./address-sets-list.component.scss"],
})
export class AddressSetsListComponent implements OnInit {
	@Output() update: EventEmitter<void> = new EventEmitter<void>();
	public addressSets: Readonly<AddressSet>[];
	public newSet: string = "";

	@ViewChild(SegmentDisplayComponent, { static: true }) newField: SegmentDisplayComponent;

	public get existingSetsRegex(): string {
		return `^((?!${this.addressSets.map((set) => set.name).join("|")}).*)$`;
	}

	public constructor(private alert: AlertService, private gateNetwork: GateNetworkService) {}

	ngOnInit() {
		this.updateAddressSets();
	}

	public onDeleteClick(name: string): void {
		this.deleteAddressSet(name);
	}

	public onDownClick(name: string): void {
		this.moveAddressSetDown(name);
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

	public onRenameSet(oldName: string, newName: string): void {
		this.gateNetwork.renameAddressSet(oldName, newName);
		this.updateAddressSets();
	}

	public onToggleClick(name: string): void {
		this.toggleAddressSet(name);
	}

	public onUpClick(name: string): void {
		this.moveAddressSetUp(name);
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

	private moveAddressSetDown(name: string): void {
		this.gateNetwork.moveAddressSetDown(name);
		this.updateAddressSets();
	}

	private moveAddressSetUp(name: string): void {
		this.gateNetwork.moveAddressSetUp(name);
		this.updateAddressSets();
	}

	private toggleAddressSet(name: string): void {
		this.gateNetwork.toggleAddressSet(name);
		this.updateAddressSets();
	}

	private updateAddressSets(): void {
		this.addressSets = this.gateNetwork.getAddressSets();
		this.update.emit();
	}
}
