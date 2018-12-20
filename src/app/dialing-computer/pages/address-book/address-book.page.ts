import { Component, OnInit } from "@angular/core";

import { Destination } from "app/shared/models";
import { GateNetworkService } from "app/shared/services";

@Component({
	selector: "address-book",
	templateUrl: "./address-book.page.html",
	styleUrls: ["./address-book.page.scss"]
})
export class AddressBookPage implements OnInit {
	public destinations: Destination[];
	public glyphHeadings = Array.from("123456");

	constructor(private gateNetwork: GateNetworkService) {}

	ngOnInit() {
		this.destinations = this.gateNetwork.getAllAddresses();
	}
}
