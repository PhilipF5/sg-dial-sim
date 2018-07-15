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

import { Component, OnInit } from "@angular/core";

import { ChevronStatus, ChevronStatuses } from "shared/models";
import { GateStatusService } from "shared/services";

@Component({
	selector: "chevron-status",
	templateUrl: "./chevron-status.component.html",
	styleUrls: ["./chevron-status.component.scss"],
})
export class ChevronStatusComponent implements OnInit {
	public statuses: ChevronStatuses;

	constructor(private gateStatus: GateStatusService) {}

	ngOnInit() {
		this.gateStatus.chevrons.subscribe(statuses => {
			this.statuses = statuses;
		});
	}

	public isEngaged(chevron: number): boolean {
		return this.statuses[chevron] === ChevronStatus.Engaged;
	}

	public isFailed(chevron: number): boolean {
		return this.statuses[chevron] === ChevronStatus.Failed;
	}
}
