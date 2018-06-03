import { Directive, ElementRef, Input, ViewChild } from "@angular/core";

import { GateAnimations } from "shared/animations";
import { ChevronPart, ChevronParts } from "shared/models";
import { TimelineLite } from "gsap";
import { Time } from "@angular/common";

@Directive({ selector: "[chevron]" })
export class ChevronDirective {
	@Input() chevron: number;

	private parts: ChevronParts;

	constructor(private elem: ElementRef) {}

	ngAfterViewInit() {
		let elem = this.elem.nativeElement;
		this.parts = {
			back: elem.querySelector(".chevron-back"),
			head: elem.querySelector(".chevron-head"),
			tail: elem.querySelector(".chevron-tail"),
			tailBorder: elem.querySelector(".chevron-tail-border")
		};
	}

	public activate(): TimelineLite {
		return GateAnimations.activateChevron(this.parts);
	}

	public inactivate(): TimelineLite {
		return GateAnimations.inactivateChevron(this.parts);
	}

	public lock(succeed: boolean = true, final: boolean = false): TimelineLite {
		let timeline = new TimelineLite();
		timeline.add(GateAnimations.lockTopChevronAttempt(this.parts));
		if (succeed) {
			timeline.add(GateAnimations.lockTopChevronSuccess(this.parts));
		}
		if (!final) {
			timeline.add(GateAnimations.inactivateChevron(this.parts), "+=0.5");
		}
		return timeline;
	}
}
