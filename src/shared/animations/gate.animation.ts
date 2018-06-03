import { ElementRef } from "@angular/core";

import { TimelineLite, TweenLite } from "gsap";

import { ChevronParts } from "shared/models";

export class GateAnimations {
	public static activateChevron(parts: ChevronParts) {
		return new TimelineLite().add([
			TweenLite.to(parts.head, 0.5, { fill: "red" }),
			TweenLite.to(parts.tail, 0.5, { stroke: "red" })
		]);
	}

	public static inactivateChevron(parts: ChevronParts) {
		return new TimelineLite().add([
			TweenLite.to(parts.head, 0.5, { fill: "none" }),
			TweenLite.to(parts.tailBorder || parts.tail, 0.5, { stroke: "#87cefa" })
		]);
	}

	public static lockTopChevronAttempt(parts: ChevronParts) {
		let timeline = new TimelineLite();
		timeline.add([TweenLite.to(parts.tail, 0.5, { y: 20 }), TweenLite.to(parts.back, 0.5, { y: 20 })]);
		timeline.to(parts.head, 0.5, { y: -10 });
		return timeline;
	}

	public static lockTopChevronSuccess(parts: ChevronParts) {
		let timeline = new TimelineLite();
		timeline.add([TweenLite.to(parts.tailBorder, 0.5, { stroke: "red" }), TweenLite.to(parts.head, 0.5, { fill: "red" })]);
		timeline.add(TweenLite.to([parts.tail, parts.head, parts.back], 0.5, { y: 0 }), "+=0.5");
		return timeline;
	}
}
