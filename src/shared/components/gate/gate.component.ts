import { Component, ElementRef, Input, QueryList, ViewChildren } from "@angular/core";

import { Elastic, Power1, Power4, TimelineLite, TweenMax } from "gsap";

import { DialingService } from "dialing-computer/services";
import { ChevronDirective } from "shared/directives";
import { GateStatus } from "shared/models";
import { GateStatusService } from "shared/services";

@Component({
	selector: "gate",
	templateUrl: "./gate.component.html",
	styleUrls: ["./gate.component.scss"]
})
export class GateComponent {
	@ViewChildren(ChevronDirective) private chevrons: QueryList<ChevronDirective>;

	constructor(private dialing: DialingService, private gateStatus: GateStatusService) {}

	ngOnInit() {
		this.gateStatus.subscribe(status => {});
		this.dialing.activations$.subscribe(a => {
			a.chevronTimeline = this.engageChevron(a.chevron);
			this.dialing.chevronAnimReady$.next(a.chevron);
		});
	}

	public chevron(index: number): ChevronDirective {
		return this.chevrons.find(c => c.chevron === index);
	}

	private engageChevron(chevron: number): TimelineLite {
		let timeline = new TimelineLite();
		timeline.add(this.chevron(7).lock(true, chevron === 7), "+=1");
		timeline.add(this.chevron(chevron).activate(), "-=1");
		return timeline;
	}
}
