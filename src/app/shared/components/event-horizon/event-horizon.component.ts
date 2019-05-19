import { Component, ElementRef, OnDestroy, OnInit } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { TimelineLite, TweenMax } from "gsap";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

import { DialingComputerActions } from "app/dialing-computer/actions";
import { getGateStatus } from "app/dialing-computer/selectors";
import { EventHorizonAnimations } from "app/shared/animations";
import { GateStatus } from "app/shared/models";
import { AudioService } from "app/shared/services";

@Component({
	selector: "event-horizon",
	templateUrl: "./event-horizon.component.html",
	styleUrls: ["./event-horizon.component.scss"],
})
export class EventHorizonComponent implements OnDestroy, OnInit {
	private readonly ignoredStatuses = [GateStatus.Dialing, GateStatus.Engaged];
	private killSubscriptions: Subject<{}> = new Subject();

	private get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	constructor(private audio: AudioService, private _elem: ElementRef, private store$: Store<any>) {}

	ngOnDestroy() {
		this.killSubscriptions.next();
	}

	ngOnInit() {
		this.store$
			.pipe(
				select(getGateStatus),
				filter(s => !this.ignoredStatuses.includes(s)),
				takeUntil(this.killSubscriptions)
			)
			.subscribe(status => this.setAnimation(status));
	}

	private setAnimation(status: GateStatus): TimelineLite {
		TweenMax.killTweensOf(this.elem);
		switch (status) {
			case GateStatus.Idle:
				return EventHorizonAnimations.inactiveFlasher(this.elem);
			case GateStatus.Active:
				return EventHorizonAnimations.gateOpen(this.elem).add(() => this.audio.startEventHorizon(), 0);
			case GateStatus.Shutdown:
				return new TimelineLite()
					.add(EventHorizonAnimations.shutdown(this.elem))
					.add(() => this.audio.stopEventHorizon(), 0)
					.add(() => this.store$.dispatch(new DialingComputerActions.GateClosed()), "+=1");
		}
	}
}
