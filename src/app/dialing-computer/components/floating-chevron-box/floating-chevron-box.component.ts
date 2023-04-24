import { Component, NgZone } from "@angular/core";
import { Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ChevronBoxComponent } from "../chevron-box/chevron-box.component";
import { AudioService } from "app/shared/services";

@Component({
	selector: "sg-floating-chevron-box",
	templateUrl: "./floating-chevron-box.component.html",
	styleUrls: ["./floating-chevron-box.component.scss"],
})
export class FloatingChevronBoxComponent extends ChevronBoxComponent {
	constructor(
		protected actions$: Actions,
		protected audio: AudioService,
		protected ngZone: NgZone,
		protected store$: Store<any>,
	) {
		super(actions$, audio, ngZone, store$);
	}
}
