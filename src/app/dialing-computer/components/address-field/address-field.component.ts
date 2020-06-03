import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from "@angular/core";

@Component({
	selector: "sg-address-field",
	templateUrl: "./address-field.component.html",
	styleUrls: ["./address-field.component.scss"],
})
export class AddressFieldComponent {
	@HostBinding("class.editable") @Input() editable: boolean = false;
	@Input() label: string;
	@Input() set value(newValue: string) {
		this.workingValue = this.lastInputValue = newValue;
	}

	@Output() saveValue: EventEmitter<string> = new EventEmitter<string>();

	public editMode: boolean = false;

	private lastInputValue: string;
	private workingValue: string;

	public constructor(private _elem: ElementRef) {}

	@HostListener("blur")
	public onBlur() {
		this.editMode = false;
		if (this.workingValue.match(/^[A-Z].*/) && this.workingValue !== this.lastInputValue) {
			this.saveValue.emit(this.workingValue);
		} else {
			this.workingValue = this.lastInputValue;
		}
	}

	@HostListener("focus")
	public onFocus() {
		this.editMode = true;
	}

	@HostListener("keydown", ["$event"])
	public onKeydown(event: KeyboardEvent) {
		if (event.key.match(/^.$/i) && this.workingValue.length < 25) {
			this.workingValue += event.key;
		} else if (event.key === "Backspace" && this.workingValue.length > 0) {
			this.workingValue = this.workingValue.substring(0, this.workingValue.length - 1);
		} else if (event.key === "Enter") {
			this._elem.nativeElement.blur();
		}
	}
}
