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
