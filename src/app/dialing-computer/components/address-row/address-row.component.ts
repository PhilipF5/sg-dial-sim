import { Component, Input } from "@angular/core";

import { Destination } from "app/shared/models";

@Component({
	selector: "address-row",
	templateUrl: "./address-row.component.html",
	styleUrls: ["./address-row.component.scss"]
})
export class AddressRowComponent {
	@Input() destination: Destination;
}
