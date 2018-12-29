import { Component, Input } from "@angular/core";

import { Glyph } from "app/shared/models";

@Component({
	selector: "address-glyph-display",
	templateUrl: "./address-glyph-display.component.html",
	styleUrls: ["./address-glyph-display.component.scss"],
})
export class AddressGlyphDisplayComponent {
	@Input() glyph: Glyph;
}
