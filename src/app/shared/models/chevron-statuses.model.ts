import { ChevronStatus } from "./chevron-status.model";

export interface ChevronStatuses {
	1: ChevronStatus;
	2: ChevronStatus;
	3: ChevronStatus;
	4: ChevronStatus;
	5: ChevronStatus;
	6: ChevronStatus;
	7: ChevronStatus;
	8: ChevronStatus;
	9: ChevronStatus;
}

export class DefaultChevronStatuses {
	public static readonly 7: ChevronStatuses = {
		1: ChevronStatus.Idle,
		2: ChevronStatus.Idle,
		3: ChevronStatus.Idle,
		4: ChevronStatus.Idle,
		5: ChevronStatus.Idle,
		6: ChevronStatus.Idle,
		7: ChevronStatus.Idle,
		8: ChevronStatus.Inactive,
		9: ChevronStatus.Inactive,
	};
}

export interface PartialChevronStatuses {
	1?: ChevronStatus;
	2?: ChevronStatus;
	3?: ChevronStatus;
	4?: ChevronStatus;
	5?: ChevronStatus;
	6?: ChevronStatus;
	7?: ChevronStatus;
	8?: ChevronStatus;
	9?: ChevronStatus;
}
