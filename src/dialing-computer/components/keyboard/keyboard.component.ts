import { Component, EventEmitter, Output } from "@angular/core";

import { Glyph } from "shared/models";

@Component({
	selector: "keyboard",
	templateUrl: "./keyboard.component.html",
	styleUrls: ["./keyboard.component.scss"]
})
export class KeyboardComponent {
	@Output() close: EventEmitter<void> = new EventEmitter();

	@Output() dialAddress: EventEmitter<Glyph[]> = new EventEmitter();

	@Output() shutdownGate: EventEmitter<void> = new EventEmitter();

	public address: Glyph[] = [];
	public keys: Glyph[] = [
		{ char: "B", name: "Crater" },
		{ char: "C", name: "Virgo" },
		{ char: "D", name: "Bootes" },
		{ char: "E", name: "Centaurus" },
		{ char: "F", name: "Libra" },
		{ char: "G", name: "Serpens Caput" },
		{ char: "H", name: "Norma" },
		{ char: "I", name: "Scorpius" },
		{ char: "J", name: "Corona Australis" },
		{ char: "K", name: "Scutum" },
		{ char: "L", name: "Sagittarius" },
		{ char: "M", name: "Aquila" },
		{ char: "N", name: "Microscopium" },
		{ char: "O", name: "Capricornus" },
		{ char: "P", name: "Piscis Austrinus" },
		{ char: "Q", name: "Equuleus" },
		{ char: "R", name: "Aquarius" },
		{ char: "S", name: "Pegasus" },
		{ char: "T", name: "Sculptor" },
		{ char: "U", name: "Pisces" },
		{ char: "V", name: "Andromeda" },
		{ char: "W", name: "Triangulum" },
		{ char: "X", name: "Aries" },
		{ char: "Y", name: "Perseus" },
		{ char: "Z", name: "Cetus" },
		{ char: "a", name: "Taurus" },
		{ char: "b", name: "Auriga" },
		{ char: "c", name: "Eridanus" },
		{ char: "d", name: "Orion" },
		{ char: "e", name: "Canis Minor" },
		{ char: "f", name: "Monoceros" },
		{ char: "g", name: "Gemini" },
		{ char: "h", name: "Hydra" },
		{ char: "i", name: "Lynx" },
		{ char: "j", name: "Cancer" },
		{ char: "k", name: "Sextans" },
		{ char: "l", name: "Leo Minor" },
		{ char: "m", name: "Leo" }
	];

	public backspace(): void {
		this.address.pop();
	}

	public closeKeyboard(): void {
		this.close.emit();
	}

	public isGlyphSelected(glyph: Glyph): boolean {
		return this.address.filter(item => item === glyph).length !== 0;
	}

	public selectGlyph(glyph: Glyph): void {
		if (this.address.length < 6 && !this.isGlyphSelected(glyph)) {
			this.address.push(glyph);
		}
	}

	public shutdown(): void {
		this.shutdownGate.emit();
	}

	public validateAndDial(): void {
		if (this.address.length === 6) {
			this.dialAddress.emit(this.address);
			this.close.emit();
		}
	}
}
