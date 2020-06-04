import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output } from "@angular/core";
import { Destination } from "app/shared/models";
import { GateNetworkService } from "app/shared/services";

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
	@Output() cancelEdit: EventEmitter<void> = new EventEmitter<void>();
	@Output() save: EventEmitter<Destination> = new EventEmitter<Destination>();
	private updatedDestination: Destination;

	public get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	@HostBinding("class.has-changes")
	public get hasChanges(): boolean {
		return !!this.updatedDestination;
	}

	public get setsRegex(): string {
		return `^(${this.gateNetwork
			.getAddressSets()
			.map((set) => set.name)
			.join("|")})$`;
	}

	constructor(private _elem: ElementRef, private gateNetwork: GateNetworkService) {}

	ngOnInit() {
		this.dataName = this.destination.name;
	}

	public onCancelEdit(): void {
		this.updatedDestination = undefined;
		this.cancelEdit.emit();
	}

	public onConfirmEdit(): void {
		this.save.emit(this.updatedDestination);
	}

	public onUpdateField(key: string, value: string) {
		if (!this.updatedDestination) {
			this.updatedDestination = { ...this.destination };
		}
		this.updatedDestination[key] = value;
	}
}
