import { Component, EventEmitter, Output } from "@angular/core";

import { Glyph } from "../../../shared/models";

@Component({
	selector: "keyboard",
	templateUrl: "./keyboard.component.html",
	styleUrls: ["./keyboard.component.scss"]
})
export class KeyboardComponent {
	@Output()
	public close: EventEmitter<void> = new EventEmitter();

	@Output()
	public dialAddress: EventEmitter<Glyph[]> = new EventEmitter();

	@Output()
	public shutdownGate: EventEmitter<void> = new EventEmitter();

	public address: Glyph[] = [];
	public keys: Glyph[] = [
		new Glyph({ char: "B", name: "Crater" }),
		new Glyph({ char: "C", name: "Virgo" }),
		new Glyph({ char: "D", name: "Bootes" }),
		new Glyph({ char: "E", name: "Centaurus" }),
		new Glyph({ char: "F", name: "Libra" }),
		new Glyph({ char: "G", name: "Serpens Caput" }),
		new Glyph({ char: "H", name: "Norma" }),
		new Glyph({ char: "I", name: "Scorpius" }),
		new Glyph({ char: "J", name: "Corona Australis" }),
		new Glyph({ char: "K", name: "Scutum"}),
		new Glyph({ char: "L", name: "Sagittarius" }),
		new Glyph({ char: "M", name: "Aquila" }),
		new Glyph({ char: "N", name: "Microscopium" }),
		new Glyph({ char: "O", name: "Capricornus" }),
		new Glyph({ char: "P", name: "Piscis Austrinus" }),
		new Glyph({ char: "Q", name: "Equuleus" }),
		new Glyph({ char: "R", name: "Aquarius" }),
		new Glyph({ char: "S", name: "Pegasus" }),
		new Glyph({ char: "T", name: "Sculptor" }),
		new Glyph({ char: "U", name: "Pisces" }),
		new Glyph({ char: "V", name: "Andromeda" }),
		new Glyph({ char: "W", name: "Triangulum" }),
		new Glyph({ char: "X", name: "Aries" }),
		new Glyph({ char: "Y", name: "Perseus" }),
		new Glyph({ char: "Z", name: "Cetus" }),
		new Glyph({ char: "a", name: "Taurus" }),
		new Glyph({ char: "b", name: "Auriga" }),
		new Glyph({ char: "c", name: "Eridanus" }),
		new Glyph({ char: "d", name: "Orion" }),
		new Glyph({ char: "e", name: "Canis Minor" }),
		new Glyph({ char: "f", name: "Monoceros" }),
		new Glyph({ char: "g", name: "Gemini" }),
		new Glyph({ char: "h", name: "Hydra" }),
		new Glyph({ char: "i", name: "Lynx" }),
		new Glyph({ char: "j", name: "Cancer" }),
		new Glyph({ char: "k", name: "Sextans" }),
		new Glyph({ char: "l", name: "Leo Minor" }),
		new Glyph({ char: "m", name: "Leo" })
	];

	constructor() {}

	public backspace() {
		this.address.pop();
	}

	public closeKeyboard() {
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

	public validateAndDial() {
		if (this.address.length === 6) {
			this.dialAddress.emit(this.address);
			this.close.emit();
		}
	}
}
