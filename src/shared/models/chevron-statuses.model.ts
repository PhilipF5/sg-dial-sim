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
