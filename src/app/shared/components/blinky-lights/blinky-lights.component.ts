import { Component } from "@angular/core";
import { random } from "lodash-es";

@Component({
	selector: "sg-blinky-lights",
	templateUrl: "./blinky-lights.component.html",
	styleUrls: ["./blinky-lights.component.scss"],
})
export class BlinkyLightsComponent {
	private static readonly _colors: string[] = [
		"var(--primary-color)",
		"var(--secondary-color)",
		...Array(5).fill("transparent"),
	];
	private static readonly _delays: number[] = [1.5, 3, 4.5, 6.0];

	public colors: string[] = [];
	public delays: number[] = [];

	constructor() {
		for (let i = 0; i < 4; i++) {
			this.colors.push(BlinkyLightsComponent._colors[random(3)]);
			this.delays.push(BlinkyLightsComponent._delays[random(3)]);
		}
	}
}
