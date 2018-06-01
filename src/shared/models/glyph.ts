export interface IGlyph {
	char: string;
	name: string;
}

export class Glyph {
	char: string;
	name: string;

	constructor(glyph: IGlyph) {
		this.char = glyph.char;
		this.name = glyph.name;
	}
}
