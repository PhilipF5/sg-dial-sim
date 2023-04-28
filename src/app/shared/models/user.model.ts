import { UserRank } from "./user-rank.model";

export class User {
	public authCode: string;
	public firstName: string;
	public lastName: string;
	public rank: UserRank;
	public userId: string;

	public get fullName(): string {
		return `${this.rank} ${this.firstName[0]}. ${this.lastName}`.trim();
	}

	public constructor(init?: Partial<User>) {
		Object.assign(this, init);
	}

	public static Default(): User {
		return new User({
			authCode: "10183523652-4354393",
			firstName: "Walter",
			lastName: "Harriman",
			rank: UserRank.ChiefMasterSergeant,
			userId: "102951-2",
		});
	}
}
