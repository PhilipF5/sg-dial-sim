import { Component, ElementRef } from "@angular/core";

import { TimelineLite, TweenMax } from "gsap";

import { EventHorizonAnimations } from "shared/animations";
import { GateStatus } from "shared/models";
import { GateStatusService } from "shared/services";

@Component({
	selector: "event-horizon",
	templateUrl: "./event-horizon.component.html",
	styleUrls: ["./event-horizon.component.scss"]
})
export class EventHorizonComponent {
	private readonly ignoredStatuses = [GateStatus.Dialing, GateStatus.Engaged];

	constructor(private elem: ElementRef, private gateStatus: GateStatusService) {}

	ngOnInit() {
		this.gateStatus.subscribe(status => {
			if (!this.ignoredStatuses.includes(status)) {
				this.setAnimation(status);
			}
		});
	}

	private setAnimation(status: GateStatus): TimelineLite {
		TweenMax.killTweensOf(this.elem);
		switch (status) {
			case GateStatus.Idle:
				return EventHorizonAnimations.inactiveFlasher(this.elem);
			case GateStatus.Active:
				return EventHorizonAnimations.gateOpen(this.elem);
			case GateStatus.Shutdown:
				return EventHorizonAnimations.shutdown(this.elem);
		}
	}
}
