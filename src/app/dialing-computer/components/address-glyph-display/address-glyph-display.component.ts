import { Component, Input } from "@angular/core";
import { Glyph } from "app/shared/models";

@Component({
	selector: "sg-address-glyph-display",
	templateUrl: "./address-glyph-display.component.html",
	styleUrls: ["./address-glyph-display.component.scss"],
})
export class AddressGlyphDisplayComponent {
	@Input() glyph: Glyph;
}
