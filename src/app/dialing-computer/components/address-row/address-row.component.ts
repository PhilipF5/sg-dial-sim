import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from "@angular/core";
import { Destination, Glyph, Glyphs } from "app/shared/models";
import { GateNetworkService } from "app/shared/services";
import { GlyphEntryComponent } from "../glyph-entry/glyph-entry.component";

@Component({
	selector: "sg-address-row",
	templateUrl: "./address-row.component.html",
	styleUrls: ["./address-row.component.scss"],
})
export class AddressRowComponent implements OnInit {
	@HostBinding("attr.data-name") dataName: string;
	@HostBinding("class.selected") @Input() selected: boolean;
	@Input() editable: boolean = false;
	@Input() savedDestination: Destination;
	@Output() cancelEdit: EventEmitter<void> = new EventEmitter<void>();
	@Output() registerUpdate: EventEmitter<Destination> = new EventEmitter<Destination>();
	@Output() save: EventEmitter<Destination> = new EventEmitter<Destination>();
	@ViewChild(GlyphEntryComponent, { static: true }) private glyphEntry: GlyphEntryComponent;
	private updatedDestination: Destination;

	public get addressValidatorFn() {
		return (address: Glyph[]) => address.length >= 6 && !this.gateNetwork.getDestinationByAddress(address);
	}

	public get destination(): Destination {
		return this.updatedDestination || this.savedDestination;
	}

	public get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	@HostBinding("class.has-changes")
	public get hasChanges(): boolean {
		return !!this.updatedDestination;
	}

	public get pointOfOrigin(): Glyph {
		return Glyphs.pointOfOrigin;
	}

	public get setsRegex(): string {
		return `^(${this.gateNetwork
			.getAddressSets()
			.map((set) => set.name)
			.filter((set) => set !== "Default")
			.join("|")})$`;
	}

	constructor(private _elem: ElementRef, private gateNetwork: GateNetworkService) {}

	ngOnInit() {
		this.dataName = this.savedDestination.name;
	}

	public onCancelEdit(): void {
		this.updatedDestination = undefined;
		this.cancelEdit.emit();
	}

	public onConfirmEdit(): void {
		this.save.emit(this.updatedDestination);
	}

	public onEditGlyphs(): void {
		this.glyphEntry.open(this.destination.address.filter((g) => !!g));
	}

	public onUpdateField(key: string, value: string): void {
		if (!this.updatedDestination) {
			this.updatedDestination = new Destination({ ...this.savedDestination });
		}
		this.updatedDestination[key] = value;
		this.registerUpdate.emit(this.updatedDestination);
	}

	public onUpdateGlyphs(glyphs: Glyph[]): void {
		if (!this.updatedDestination) {
			this.updatedDestination = new Destination({ ...this.savedDestination });
		}
		this.updatedDestination.coordinates = glyphs.map((g) => g.position);
		this.registerUpdate.emit(this.updatedDestination);
	}
}
