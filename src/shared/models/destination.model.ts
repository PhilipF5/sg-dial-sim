import { Glyph, Glyphs } from "./glyph.model";

export interface Destination {
	address: Glyph[];
	name: string;
}

export const DefaultAddressSet: Destination[] = [
	{
		address: [28, 26, 5, 36, 11, 29].map(n => Glyphs.standard.find(g => g.position === n)),
		name: "Earth",
	},
];
