import { Component, ElementRef } from "@angular/core";

import { TimelineLite, TweenMax } from "gsap";

import { GateStatus } from "shared/models";
import { GateStatusService } from "shared/services";
import { EventHorizonAnimations } from "./event-horizon.animation";

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
				return EventHorizonAnimations.anim_inactiveFlasher(this.elem);
			case GateStatus.Active:
				return EventHorizonAnimations.anim_gateOpen(this.elem);
			case GateStatus.Shutdown:
				return EventHorizonAnimations.anim_shutdown(this.elem);
		}
	}
}
