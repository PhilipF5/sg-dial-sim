import { Component, Input } from "@angular/core";

@Component({
	selector: "sg-button",
	templateUrl: "./sg-button.component.html",
	styleUrls: ["./sg-button.component.scss"]
})
export class SgButtonComponent {
	@Input() text: string;
}
