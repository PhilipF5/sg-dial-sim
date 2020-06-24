import { Component, ElementRef } from "@angular/core";
import { Store } from "@ngrx/store";
import { GateNetworkService } from "app/shared/services";
import { KeyboardComponent } from "../keyboard/keyboard.component";

@Component({
	selector: "sg-glyph-entry",
	templateUrl: "../keyboard/keyboard.component.html",
	styleUrls: ["../keyboard/keyboard.component.scss"],
})
export class GlyphEntryComponent extends KeyboardComponent {
	public displayShutdownButton: boolean = false;
	public submitText: string = "Save";

	public constructor(_elem: ElementRef, gateNetwork: GateNetworkService, store$: Store<any>) {
		super(_elem, gateNetwork, store$);
	}

	public isAddressValid(): boolean {
		return this.address.length >= 6;
	}

	public shutdown(): void {
		return;
	}
}
