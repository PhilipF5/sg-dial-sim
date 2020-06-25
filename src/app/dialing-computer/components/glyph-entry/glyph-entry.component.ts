import { Component, ElementRef, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { Glyph } from "app/shared/models";
import { GateNetworkService } from "app/shared/services";
import { KeyboardComponent } from "../keyboard/keyboard.component";

@Component({
	selector: "sg-glyph-entry",
	templateUrl: "../keyboard/keyboard.component.html",
	styleUrls: ["../keyboard/keyboard.component.scss"],
})
export class GlyphEntryComponent extends KeyboardComponent {
	@Input() validatorFn = (address: Glyph[]) => address.length >= 6;
	public displayShutdownButton: boolean = false;
	public submitText: string = "Save";

	public constructor(_elem: ElementRef, gateNetwork: GateNetworkService, store$: Store<any>) {
		super(_elem, gateNetwork, store$);
	}

	public isAddressValid(): boolean {
		return this.validatorFn(this.address);
	}

	public shutdown(): void {
		return;
	}
}
