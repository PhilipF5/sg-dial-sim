import { Component, ElementRef, HostBinding, Input, OnInit } from "@angular/core";
import { Destination } from "app/shared/models";

@Component({
	selector: "sg-address-row",
	templateUrl: "./address-row.component.html",
	styleUrls: ["./address-row.component.scss"],
})
export class AddressRowComponent implements OnInit {
	@HostBinding("attr.data-name") dataName: string;
	@HostBinding("class.selected") @Input() selected: boolean;
	@Input() destination: Destination;
	@Input() editable: boolean = false;

	public get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	constructor(private _elem: ElementRef) {}

	ngOnInit() {
		this.dataName = this.destination.name;
	}
}
