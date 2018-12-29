import { Component, OnDestroy, OnInit } from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { ChevronStatus, ChevronStatuses } from "app/shared/models";
import { GateStatusService } from "app/shared/services";

@Component({
	selector: "chevron-status",
	templateUrl: "./chevron-status.component.html",
	styleUrls: ["./chevron-status.component.scss"],
})
export class ChevronStatusComponent implements OnDestroy, OnInit {
	public statuses: ChevronStatuses;

	private killSubscriptions: Subject<{}> = new Subject();

	constructor(private gateStatus: GateStatusService) {}

	ngOnDestroy() {
		this.killSubscriptions.next();
	}

	ngOnInit() {
		this.gateStatus.chevrons.statuses$.pipe(takeUntil(this.killSubscriptions)).subscribe(statuses => {
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
