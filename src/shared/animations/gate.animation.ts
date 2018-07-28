import { ElementRef } from "@angular/core";

import { Power1, Linear, TimelineLite, TweenLite } from "gsap";

import { ChevronParts } from "shared/models";

export class GateAnimations {
	public static activateChevron(parts: ChevronParts) {
		return new TimelineLite().add([
			TweenLite.to(parts.head, 0.5, { fill: "red", stroke: "red" }),
			TweenLite.to(parts.tail, 0.5, { stroke: "red" }),
		]);
	}

	public static inactivateChevron(parts: ChevronParts) {
		return new TimelineLite().add([
			TweenLite.to(parts.head, 0.5, { y: 0, fill: "black", stroke: "white" }),
			TweenLite.to(parts.tail, 0.5, { y: 0, stroke: "white" }),
		]);
	}

	public static lockTopChevronAttempt(parts: ChevronParts) {
		return new TimelineLite()
			.add(TweenLite.to(parts.tail, 0.5, { y: 20 }), "tailOpen")
			.to(parts.head, 0.5, { y: -10 }, "headOpen");
	}

	public static lockTopChevronSuccess(parts: ChevronParts) {
		return new TimelineLite()
			.add(
				[
					TweenLite.to(parts.tail, 0.5, { stroke: "red" }),
					TweenLite.to(parts.head, 0.5, { fill: "red", stroke: "red" }),
				],
				"light"
			)
			.add("lock", "+=0.5")
			.add(TweenLite.to([parts.tail, parts.head], 0.5, { y: 0 }), "lock");
	}

	public static spinRing(ring: ElementRef, duration: number, degrees: string) {
		return new TimelineLite()
			.to(ring.nativeElement, 1, {
				rotation: degrees.substr(0, 2) + "4.61538",
				transformOrigin: "center center",
				ease: Power1.easeIn,
			})
			.to(ring.nativeElement, duration, {
				rotation: degrees,
				transformOrigin: "center center",
				ease: Linear.easeNone,
			})
			.to(ring.nativeElement, 1, {
				rotation: degrees.substr(0, 2) + "4.61538",
				transformOrigin: "center center",
				ease: Power1.easeOut,
			});
	}
}
