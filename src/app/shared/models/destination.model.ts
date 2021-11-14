import { v4 as uuidv4 } from "uuid";
import { Glyph, Glyphs } from "./glyph.model";

export class Destination {
	public get address(): Glyph[] {
		return this.coordinates.map((n) => Glyphs.standard.find((g) => g.position === n));
	}
	public coordinates: number[];
	public desc?: string;
	public id?: string;
	public name: string;
	public set?: string;

	public constructor(init?: Partial<Destination>) {
		Object.assign(this, init);
	}

	public clone(changes: Partial<Destination>): Destination {
		const { coordinates, desc, id, name, set } = this;
		return new Destination({
			coordinates: [...coordinates],
			desc,
			id,
			name,
			set,
			...changes,
		});
	}
}

const addresses = [
	{
		coordinates: [28, 26, 5, 36, 11, 29],
		name: "Earth",
	},
	{
		coordinates: [27, 7, 15, 32, 12, 30],
		name: "Abydos",
	},
	{
		coordinates: [28, 8, 16, 33, 13, 31],
		name: "P2X-555",
	},
	{
		coordinates: [29, 5, 36, 6, 23, 20],
		name: "P3X-984",
	},
	{
		coordinates: [34, 27, 30, 11, 35, 28],
		name: "Alpha",
	},
	{
		coordinates: [33, 31, 27, 37, 35, 34],
		name: "P4X-650",
	},
	{
		coordinates: [29, 8, 18, 22, 4, 25],
		name: "Altair",
	},
	{
		coordinates: [4, 9, 3, 12, 21, 16],
		desc: "Anubis's Stargate destroyer",
		name: "Unknown",
	},
	{
		coordinates: [30, 27, 39, 35, 21, 16],
		name: "Arkhan",
	},
	{
		coordinates: [8, 21, 13, 16, 4, 25],
		name: "Burrock",
	},
	{
		coordinates: [20, 2, 35, 8, 26, 15],
		name: "Camelot",
	},
	{
		coordinates: [29, 3, 6, 9, 12, 16],
		name: "Castiana",
	},
	{
		coordinates: [9, 2, 23, 15, 37, 20],
		name: "Chulak",
	},
	{
		coordinates: [11, 35, 22, 17, 6, 26],
		name: "Cimmeria",
	},
	{
		coordinates: [16, 28, 3, 8, 33, 4],
		name: "Dakara",
	},
	{
		coordinates: [28, 39, 35, 9, 15, 3],
		name: "Edora",
	},
	{
		coordinates: [20, 9, 7, 5, 18, 19],
		name: "Erebus",
	},
	{
		coordinates: [30, 27, 9, 7, 18, 16],
		name: "Euronda",
	},
	{
		coordinates: [9, 19, 26, 17, 22, 5],
		name: "Gaia",
	},
	{
		coordinates: [18, 33, 4, 14, 21, 16],
		name: "Galar",
	},
	{
		coordinates: [8, 35, 20, 31, 28, 30],
		name: "Hak'tyl",
	},
	{
		coordinates: [21, 13, 26, 17, 5, 37],
		name: "Hanka",
	},
	{
		coordinates: [28, 32, 33, 31, 35, 16],
		name: "Hebridan",
	},
	{
		coordinates: [37, 27, 31, 4, 38, 39],
		desc: 'Jaffa encampment ("Bounty")',
		name: "Unknown",
	},
	{
		coordinates: [29, 8, 18, 22, 4, 25],
		name: "Juna",
	},
	{
		coordinates: [18, 2, 30, 12, 26, 33],
		name: "K'tau",
	},
	{
		coordinates: [6, 16, 8, 3, 26, 33],
		name: "Kallana",
	},
	{
		coordinates: [26, 35, 6, 8, 23, 14],
		name: "Kheb",
	},
	{
		coordinates: [3, 39, 16, 8, 10, 12],
		desc: "Klorel's Ha'tak",
		name: "Unknown",
	},
	{
		coordinates: [25, 3, 11, 12, 21, 16],
		name: "Langara",
	},
	{
		coordinates: [16, 34, 28, 12, 4, 7],
		name: "Latona",
	},
	{
		coordinates: [24, 12, 32, 7, 11, 34],
		name: "Martin",
	},
	{
		coordinates: [21, 13, 26, 17, 5, 34],
		name: "Memphis",
	},
	{
		coordinates: [39, 28, 15, 35, 3, 19],
		name: "NID Base",
	},
	{
		coordinates: [34, 33, 35, 37, 27, 38],
		desc: 'Ori-enslaved world ("Counterstrike")',
		name: "Unknown",
	},
	{
		coordinates: [30, 19, 34, 9, 33, 18],
		name: "Sangraal",
	},
	{
		coordinates: [14, 7, 11, 9, 28, 22],
		name: "P1B-3R2",
	},
	{
		coordinates: [4, 18, 22, 24, 13, 28],
		name: "P26-007",
	},
	{
		coordinates: [15, 18, 12, 34, 14, 4],
		name: "P2M-903",
	},
	{
		coordinates: [20, 21, 5, 19, 4, 25],
		name: "P2X-338",
	},
	{
		coordinates: [39, 9, 28, 15, 35, 3],
		name: "P34-353J",
	},
	{
		coordinates: [32, 27, 31, 35, 28, 30],
		name: "P3R-112",
	},
	{
		coordinates: [19, 8, 4, 37, 26, 16],
		name: "P3W-451",
	},
	{
		coordinates: [9, 26, 34, 37, 17, 21],
		name: "P3X-118",
	},
	{
		coordinates: [3, 28, 9, 35, 24, 15],
		name: "P3X-562",
	},
	{
		coordinates: [16, 18, 11, 23, 14, 19],
		name: "P3X-666",
	},
	{
		coordinates: [26, 2, 23, 24, 10, 32],
		name: "P3X-797",
	},
	{
		coordinates: [20, 18, 11, 39, 10, 32],
		name: "P3X-888",
	},
	{
		coordinates: [37, 7, 11, 20, 9, 30],
		name: "P4F-O8T",
	},
	{
		coordinates: [30, 39, 37, 38, 27, 29],
		name: "P4S-237",
	},
	{
		coordinates: [36, 15, 26, 32, 8, 5],
		name: "P4S-42Q",
	},
	{
		coordinates: [4, 9, 28, 12, 21, 16],
		name: "P4X-639",
	},
	{
		coordinates: [32, 14, 15, 7, 31, 8],
		name: "P5D-4Z2",
	},
	{
		coordinates: [35, 28, 23, 26, 25, 27],
		name: "P5S-117",
	},
	{
		coordinates: [8, 32, 23, 14, 37, 4],
		name: "P5T-4H2",
	},
	{
		coordinates: [3, 15, 18, 11, 14, 10],
		name: "P5X-777",
	},
	{
		coordinates: [17, 37, 2, 10, 26, 5],
		name: "P6T-9DA",
	},
	{
		coordinates: [39, 34, 18, 4, 17, 2],
		name: "P7J-1P3",
	},
	{
		coordinates: [25, 8, 18, 29, 4, 22],
		name: "P9C-372",
	},
	{
		coordinates: [33, 28, 30, 39, 31, 34],
		name: "P9C-882",
	},
	{
		coordinates: [2, 19, 30, 25, 12, 15],
		name: "P9G-844",
	},
	{
		coordinates: [37, 27, 20, 30, 31, 15],
		name: "P9X-6D2",
	},
	{
		coordinates: [18, 15, 11, 4, 19, 31],
		name: "Pangar",
	},
	{
		coordinates: [2, 17, 34, 18, 35, 25],
		name: "PAS-A81",
	},
	{
		coordinates: [12, 36, 23, 18, 7, 27],
		name: "PB5-926",
	},
	{
		coordinates: [6, 39, 38, 34, 33, 7],
		name: "PF4-8T2",
	},
	{
		coordinates: [11, 9, 18, 19, 20, 25],
		name: "PJ2-445",
	},
	{
		coordinates: [14, 27, 23, 3, 31, 15],
		name: "PN7-F4E",
	},
	{
		coordinates: [35, 3, 31, 34, 5, 17],
		name: "Taonas",
	},
	{
		coordinates: [20, 8, 37, 31, 4, 27],
		name: "PT1-AA1",
	},
	{
		coordinates: [14, 2, 30, 7, 13, 26],
		name: "PWW-5AC",
	},
	{
		coordinates: [21, 3, 32, 16, 14, 5],
		name: "Reese",
	},
	{
		coordinates: [37, 9, 18, 23, 26, 22],
		name: "Revanna",
	},
	{
		coordinates: [29, 18, 19, 20, 21, 22],
		name: "Sahal",
	},
	{
		coordinates: [20, 18, 11, 24, 10, 32],
		name: "Saqqara",
	},
	{
		coordinates: [5, 18, 20, 19, 7, 39],
		name: "Tagrea",
	},
	{
		coordinates: [33, 28, 23, 26, 16, 31],
		name: "Tartarus",
	},
	{
		coordinates: [39, 20, 21, 18, 9, 4],
		name: "Tegalus",
	},
	{
		coordinates: [6, 33, 27, 37, 11, 18],
		name: "Tollan",
	},
	{
		coordinates: [4, 29, 8, 22, 18, 25],
		name: "Tollana",
	},
	{
		coordinates: [3, 8, 2, 12, 19, 30],
		name: "Vagonbrei",
	},
	{
		coordinates: [3, 10, 9, 14, 36, 19],
		name: "Velona",
	},
	{
		coordinates: [30, 35, 27, 39, 21, 16],
		name: "Vis Uban",
	},
	{
		coordinates: [11, 27, 23, 16, 33, 3, 9],
		name: "Othala",
	},
	{
		coordinates: [19, 21, 2, 16, 15, 8, 20],
		name: "Atlantis",
	},
];

export const DefaultAddressSet: Partial<Destination>[] = addresses.map((a) => {
	return { ...a, id: uuidv4() };
});
