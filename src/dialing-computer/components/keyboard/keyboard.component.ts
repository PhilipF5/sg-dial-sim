import { Component, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "keyboard",
	templateUrl: "./keyboard.component.html",
	styleUrls: ["./keyboard.component.scss"]
})
export class KeyboardComponent {
	@Output() close: EventEmitter<void> = new EventEmitter();
	@Output() dialAddress: EventEmitter<string[]> = new EventEmitter();

	public address = [];
	public keys = [
		"B",
		"C",
		"D",
		"E",
		"F",
		"G",
		"H",
		"I",
		"J",
		"K",
		"L",
		"M",
		"N",
		"O",
		"P",
		"Q",
		"R",
		"S",
		"T",
		"U",
		"V",
		"W",
		"X",
		"Y",
		"Z",
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m"
	];

	constructor() {}

	public backspace() {
		this.address.pop();
	}

	public closeKeyboard() {
		this.close.emit();
	}

	public isGlyphSelected(glyph: string): boolean {
		return this.address.filter((item) => item === glyph).length !== 0;
	}

	public selectGlyph(glyph: string) {
		if (this.address.length < 6 && !this.isGlyphSelected(glyph)) {
			this.address.push(glyph);
		}
	}

	public validateAndDial() {
		if (this.address.length === 6) {
			this.dialAddress.emit(this.address);
			this.close.emit();
		}
	}
}