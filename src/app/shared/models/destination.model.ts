import { Glyph, Glyphs } from "./glyph.model";

export interface Destination {
	address: Glyph[];
	id: number;
	name: string;
}

const addresses = [
	{
		address: [28, 26, 5, 36, 11, 29],
		name: "Earth",
	},
	{
		address: [27, 7, 15, 32, 12, 30],
		name: "Abydos",
	},
	{
		address: [28, 8, 16, 33, 13, 31],
		name: "P2X-555",
	},
	{
		address: [29, 5, 36, 6, 23, 20],
		name: "P3X-984",
	},
	{
		address: [34, 27, 30, 11, 35, 28],
		name: "Alpha",
	},
	{
		address: [33, 31, 27, 37, 35, 34],
		name: "P4X-650",
	},
	{
		address: [29, 8, 18, 22, 4, 25],
		name: "Altair",
	},
	{
		address: [4, 9, 3, 12, 21, 16],
		name: "Unknown", // Anubis's Stargate destroyer
	},
	{
		address: [30, 27, 39, 35, 21, 16],
		name: "Arkhan",
	},
	{
		address: [8, 21, 13, 16, 4, 25],
		name: "Burrock",
	},
	{
		address: [20, 2, 35, 8, 26, 15],
		name: "Camelot",
	},
	{
		address: [29, 3, 6, 9, 12, 16],
		name: "Castiana",
	},
	{
		address: [9, 2, 23, 15, 37, 20],
		name: "Chulak",
	},
	{
		address: [11, 35, 22, 17, 6, 26],
		name: "Cimmeria",
	},
	{
		address: [16, 28, 3, 8, 33, 4],
		name: "Dakara",
	},
	{
		address: [28, 39, 35, 9, 15, 3],
		name: "Edora",
	},
	{
		address: [20, 9, 7, 5, 18, 19],
		name: "Erebus",
	},
	{
		address: [30, 27, 9, 7, 18, 16],
		name: "Euronda",
	},
	{
		address: [9, 19, 26, 17, 22, 5],
		name: "Gaia",
	},
	{
		address: [18, 33, 4, 14, 21, 16],
		name: "Galar",
	},
	{
		address: [8, 35, 20, 31, 28, 30],
		name: "Hak'tyl",
	},
	{
		address: [21, 13, 26, 17, 5, 37],
		name: "Hanka",
	},
	{
		address: [28, 32, 33, 31, 35, 16],
		name: "Hebridan",
	},
	{
		address: [37, 27, 31, 4, 38, 39],
		name: "Unknown", // Jaffa Encampment from "Bounty"
	},
	{
		address: [29, 8, 18, 22, 4, 25],
		name: "Juna",
	},
	{
		address: [18, 2, 30, 12, 26, 33],
		name: "K'tau",
	},
	{
		address: [6, 16, 8, 3, 26, 33],
		name: "Kallana",
	},
	{
		address: [26, 35, 6, 8, 23, 14],
		name: "Kheb",
	},
	{
		address: [3, 39, 16, 8, 10, 12],
		name: "Unknown", // Klorel's Hatak planet
	},
	{
		address: [25, 3, 11, 12, 21, 16],
		name: "Langara",
	},
	{
		address: [16, 34, 28, 12, 4, 7],
		name: "Latona",
	},
	{
		address: [24, 12, 32, 7, 11, 34],
		name: "Martin",
	},
	{
		address: [21, 13, 26, 17, 5, 34],
		name: "Memphis",
	},
	{
		address: [39, 28, 15, 35, 3, 19],
		name: "NID Base",
	},
	{
		address: [34, 33, 35, 37, 27, 38],
		name: "Unknown", // Ori-enslaved world from "Counterstrike"
	},
	{
		address: [30, 19, 34, 9, 33, 18],
		name: "Sangraal",
	},
	{
		address: [14, 7, 11, 9, 28, 22],
		name: "P1B-3R2",
	},
	{
		address: [4, 18, 22, 24, 13, 28],
		name: "P26-007",
	},
	{
		address: [15, 18, 12, 34, 14, 4],
		name: "P2M-903",
	},
	{
		address: [20, 21, 5, 19, 4, 25],
		name: "P2X-338",
	},
	{
		address: [39, 9, 28, 15, 35, 3],
		name: "P34-353J",
	},
	{
		address: [32, 27, 31, 35, 28, 30],
		name: "P3R-112",
	},
	{
		address: [19, 8, 4, 37, 26, 16],
		name: "P3W-451",
	},
	{
		address: [9, 26, 34, 37, 17, 21],
		name: "P3X-118",
	},
	{
		address: [3, 28, 9, 35, 24, 15],
		name: "P3X-562",
	},
	{
		address: [16, 18, 11, 23, 14, 19],
		name: "P3X-666",
	},
	{
		address: [26, 2, 23, 24, 10, 32],
		name: "P3X-797",
	},
	{
		address: [20, 18, 11, 39, 10, 32],
		name: "P3X-888",
	},
	{
		address: [37, 7, 11, 20, 9, 30],
		name: "P4F-O8T",
	},
	{
		address: [30, 39, 37, 38, 27, 29],
		name: "P4S-237",
	},
	{
		address: [36, 15, 26, 32, 8, 5],
		name: "P4S-42Q",
	},
	{
		address: [4, 9, 28, 12, 21, 16],
		name: "P4X-639",
	},
	{
		address: [32, 14, 15, 7, 31, 8],
		name: "P5D-4Z2",
	},
	{
		address: [35, 28, 23, 26, 25, 27],
		name: "P5S-117",
	},
	{
		address: [8, 32, 23, 14, 37, 4],
		name: "P5T-4H2",
	},
	{
		address: [3, 15, 18, 11, 14, 10],
		name: "P5X-777",
	},
	{
		address: [17, 37, 2, 10, 26, 5],
		name: "P6T-9DA",
	},
	{
		address: [39, 34, 18, 4, 17, 2],
		name: "P7J-1P3",
	},
	{
		address: [25, 8, 18, 29, 4, 22],
		name: "P9C-372",
	},
	{
		address: [33, 28, 30, 39, 31, 34],
		name: "P9C-882",
	},
	{
		address: [2, 19, 30, 25, 12, 15],
		name: "P9G-844",
	},
	{
		address: [37, 27, 20, 30, 31, 15],
		name: "P9X-6D2",
	},
	{
		address: [18, 15, 11, 4, 19, 31],
		name: "Pangar",
	},
	{
		address: [2, 17, 34, 18, 35, 25],
		name: "PAS-A81",
	},
	{
		address: [12, 36, 23, 18, 7, 27],
		name: "PB5-926",
	},
	{
		address: [6, 39, 38, 34, 33, 7],
		name: "PF4-8T2",
	},
	{
		address: [11, 9, 18, 19, 20, 25],
		name: "PJ2-445",
	},
	{
		address: [14, 27, 23, 3, 31, 15],
		name: "PN7-F4E",
	},
	{
		address: [35, 3, 31, 34, 5, 17],
		name: "Taonas",
	},
	{
		address: [20, 8, 37, 31, 4, 27],
		name: "PT1-AA1",
	},
	{
		address: [14, 2, 30, 7, 13, 26],
		name: "PWW-5AC",
	},
	{
		address: [21, 3, 32, 16, 14, 5],
		name: "Reese",
	},
	{
		address: [37, 9, 18, 23, 26, 22],
		name: "Revanna",
	},
	{
		address: [29, 18, 19, 20, 21, 22],
		name: "Sahal",
	},
	{
		address: [20, 18, 11, 24, 10, 32],
		name: "Saqqara",
	},
	{
		address: [5, 18, 20, 19, 7, 39],
		name: "Tagrea",
	},
	{
		address: [33, 28, 23, 26, 16, 31],
		name: "Tartarus",
	},
	{
		address: [39, 20, 21, 18, 9, 4],
		name: "Tegalus",
	},
	{
		address: [6, 33, 27, 37, 11, 18],
		name: "Tollan",
	},
	{
		address: [4, 29, 8, 22, 18, 25],
		name: "Tollana",
	},
	{
		address: [3, 8, 2, 12, 19, 30],
		name: "Vagonbrei",
	},
	{
		address: [3, 10, 9, 14, 36, 19],
		name: "Velona",
	},
	{
		address: [30, 35, 27, 39, 21, 16],
		name: "Vis Uban",
	},
	{
		address: [11, 27, 23, 16, 33, 3, 9],
		name: "Othala",
	},
	{
		address: [19, 21, 2, 16, 15, 8, 20],
		name: "Atlantis",
	},
];

export const DefaultAddressSet: Destination[] = addresses.map((a, i) => {
	return { address: a.address.map((n) => Glyphs.standard.find((g) => g.position === n)), id: i + 1, name: a.name };
});
