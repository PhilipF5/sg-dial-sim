import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getChevronStatus } from "app/dialing-computer/selectors";
import { ChevronStatus, ChevronStatuses } from "app/shared/models";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "sg-chevron-status",
	templateUrl: "./chevron-status.component.html",
	styleUrls: ["./chevron-status.component.scss"],
})
export class ChevronStatusComponent implements OnDestroy, OnInit {
	public statuses: ChevronStatuses;

	private killSubscriptions: Subject<{}> = new Subject();

	constructor(private store$: Store<any>) {}

	ngOnDestroy() {
		this.killSubscriptions.next({});
	}

	ngOnInit() {
		this.store$.pipe(select(getChevronStatus), takeUntil(this.killSubscriptions)).subscribe((statuses) => {
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
