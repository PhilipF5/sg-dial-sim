import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from "@angular/core";

@Component({
	selector: "sg-button",
	templateUrl: "./sg-button.component.html",
	styleUrls: ["./sg-button.component.scss"],
})
export class SgButtonComponent {
	@Input() @HostBinding("class.disabled") disabled: boolean;
	@Input() text: string;

	@Output() sgClick = new EventEmitter();

	@HostListener("click")
	public onClick() {
		this.sgClick.emit();
	}
}
