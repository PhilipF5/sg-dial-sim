import { Component, ElementRef, Input, SimpleChanges, ViewChild } from "@angular/core";

import { Elastic, Power1, Power4, TimelineLite, TweenMax } from "gsap";

import { GateStatus } from "shared/models";
import { GateStatusService } from "shared/services";

@Component({
	selector: "gate",
	templateUrl: "./gate.component.html",
	styleUrls: ["./gate.component.scss"]
})
export class GateComponent {
	@ViewChild("eventHorizon", { read: ElementRef })
	private eventHorizon: ElementRef;

	private readonly ignoredStatuses = [GateStatus.Dialing, GateStatus.Engaged];

	constructor(private gateStatus: GateStatusService) {}

	ngOnInit() {
		this.gateStatus.subscribe(status => {
			if (!this.ignoredStatuses.includes(status)) {
				this.updateFlasher(status);
			}
		});
	}

	private updateFlasher(status: GateStatus): void {
		TweenMax.killTweensOf(this.eventHorizon.nativeElement);
		TweenMax.to(this.eventHorizon.nativeElement, 0.5, { scale: 0, ease: Power4.easeIn });
		let timeline = new TimelineLite();
		switch (status) {
			case GateStatus.Idle:
			case GateStatus.Dialing:
			case GateStatus.Engaged:
				TweenMax.fromTo(
					this.eventHorizon.nativeElement,
					0.5,
					{ scale: 0, ease: Power4.easeIn },
					{ scale: 1, ease: Power4.easeIn }
				)
					.repeat(-1)
					.yoyo(true);
				break;
			case GateStatus.Active:
				timeline.to(this.eventHorizon.nativeElement, 0.5, { scale: 0, ease: Power4.easeOut });
				timeline.set(this.eventHorizon.nativeElement, { css: { className: "+=active" } });
				timeline.to(this.eventHorizon.nativeElement, 1, { scale: 4, ease: Power1.easeInOut });
				timeline.to(this.eventHorizon.nativeElement, 2.5, { scale: 3, ease: Elastic.easeInOut });
				timeline.add(
					TweenMax.to(this.eventHorizon.nativeElement, 1, { scale: 2.75, ease: Power1.easeInOut })
						.repeat(-1)
						.yoyo(true)
				);
				break;
			case GateStatus.Shutdown:
				timeline.to(this.eventHorizon.nativeElement, 2, { scale: 4, ease: Power1.easeInOut });
				timeline.to(this.eventHorizon.nativeElement, 1, { scale: 0, ease: Power4.easeIn });
				timeline.to(this.eventHorizon.nativeElement, 1, { scale: 5, opacity: 0 });
				timeline.set(this.eventHorizon.nativeElement, { css: { className: "-=active" } });
				break;
		}
	}
}
