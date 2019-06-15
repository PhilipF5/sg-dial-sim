import { Component, Input } from "@angular/core";

@Component({
	selector: "sg-segment-display",
	templateUrl: "./segment-display.component.html",
	styleUrls: ["./segment-display.component.scss"],
})
export class SegmentDisplayComponent {
	@Input() align: string;
	@Input() border: string = "both";
	@Input() size: number;
	@Input() text: string = "";

	public get chars(): string[] {
		let text = this.text || "";
		if (this.size) {
			if (this.align === "right") {
				text = text.substring(0, this.size).padStart(this.size);
			} else {
				text = text.substring(0, this.size).padEnd(this.size);
			}
		}
		return text.split("");
	}
}
