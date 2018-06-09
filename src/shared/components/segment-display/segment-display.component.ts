import { Component, Input } from "@angular/core";

@Component({
	selector: "segment-display",
	templateUrl: "./segment-display.component.html",
	styleUrls: ["./segment-display.component.scss"]
})
export class SegmentDisplayComponent {
	@Input() border: string = "both";
	@Input() text: string = "";

	public get chars(): string[] {
		return this.text.split("");
	}
}
