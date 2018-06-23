/* SGC Computer Simulator
Copyright (C) 2018  Philip Fulgham

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. */

export interface Glyph {
	char: string;
	name: string;
	position: number;
}

export const Glyphs = {
	pointOfOrigin: { char: "A", name: "Tau'ri", position: 1 },
	standard: [
		{ char: "B", name: "Crater", position: 2 },
		{ char: "C", name: "Virgo", position: 3 },
		{ char: "D", name: "Bootes", position: 4 },
		{ char: "E", name: "Centaurus", position: 5 },
		{ char: "F", name: "Libra", position: 6 },
		{ char: "G", name: "Serpens Caput", position: 7 },
		{ char: "H", name: "Norma", position: 8 },
		{ char: "I", name: "Scorpius", position: 9 },
		{ char: "J", name: "Corona Australis", position: 10 },
		{ char: "K", name: "Scutum", position: 11 },
		{ char: "L", name: "Sagittarius", position: 12 },
		{ char: "M", name: "Aquila", position: 13 },
		{ char: "N", name: "Microscopium", position: 14 },
		{ char: "O", name: "Capricornus", position: 15 },
		{ char: "P", name: "Piscis Austrinus", position: 16 },
		{ char: "Q", name: "Equuleus", position: 17 },
		{ char: "R", name: "Aquarius", position: 18 },
		{ char: "S", name: "Pegasus", position: 19 },
		{ char: "T", name: "Sculptor", position: 20 },
		{ char: "U", name: "Pisces", position: 21 },
		{ char: "V", name: "Andromeda", position: 22 },
		{ char: "W", name: "Triangulum", position: 23 },
		{ char: "X", name: "Aries", position: 24 },
		{ char: "Y", name: "Perseus", position: 25 },
		{ char: "Z", name: "Cetus", position: 26 },
		{ char: "a", name: "Taurus", position: 27 },
		{ char: "b", name: "Auriga", position: 28 },
		{ char: "c", name: "Eridanus", position: 29 },
		{ char: "d", name: "Orion", position: 30 },
		{ char: "e", name: "Canis Minor", position: 31 },
		{ char: "f", name: "Monoceros", position: 32 },
		{ char: "g", name: "Gemini", position: 33 },
		{ char: "h", name: "Hydra", position: 34 },
		{ char: "i", name: "Lynx", position: 35 },
		{ char: "j", name: "Cancer", position: 36 },
		{ char: "k", name: "Sextans", position: 37 },
		{ char: "l", name: "Leo Minor", position: 38 },
		{ char: "m", name: "Leo", position: 39 }
	]
}
