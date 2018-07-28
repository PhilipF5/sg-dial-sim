import { Glyph, Glyphs } from "./glyph.model";

export interface Destination {
	address: Glyph[];
	name: string;
}

const addresses = [
	{
		address: [28, 26, 5, 36, 11, 29],
		name: "Earth",
	},
];

export const DefaultAddressSet: Destination[] = addresses.map(a => {
	return { address: a.address.map(n => Glyphs.standard.find(g => g.position === n)), name: a.name };
});
