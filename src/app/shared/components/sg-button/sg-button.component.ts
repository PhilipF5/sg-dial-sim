import { Component, EventEmitter, HostListener, Input, Output } from "@angular/core";

@Component({
	selector: "sg-button",
	templateUrl: "./sg-button.component.html",
	styleUrls: ["./sg-button.component.scss"]
})
export class SgButtonComponent {
	@Input() text: string;

	@Output() sgClick = new EventEmitter();

	@HostListener("click")
	public onClick() {
		this.sgClick.emit();
	}
}
