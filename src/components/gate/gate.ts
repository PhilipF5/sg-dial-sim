import { Component } from "@angular/core";

/**
 * Generated class for the GateComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
	selector: "gate",
	templateUrl: "gate.html"
})
export class GateComponent {
	text: string;

	constructor() {
		console.log("Hello GateComponent Component");
		this.text = "Hello World";
	}
}
