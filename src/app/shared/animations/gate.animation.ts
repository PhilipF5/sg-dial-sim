import { ElementRef } from "@angular/core";
import { ChevronParts } from "app/shared/models";
import { Linear, Power1, TimelineLite, TweenLite } from "gsap";

export class GateAnimations {
	public static activateChevron(parts: ChevronParts): TimelineLite {
		return new TimelineLite().add([
			TweenLite.to(parts.head, 0.5, { fill: "red", stroke: "red" }),
			TweenLite.to(parts.tail, 0.5, { stroke: "red" }),
		]);
	}

	public static inactivateChevron(parts: ChevronParts): TimelineLite {
		return new TimelineLite().add([
			TweenLite.to(parts.head, 0.5, { y: 0, fill: "black", stroke: "white" }),
			TweenLite.to(parts.tail, 0.5, { y: 0, stroke: "white" }),
		]);
	}

	public static lockTopChevronAttempt(parts: ChevronParts): TimelineLite {
		return new TimelineLite()
			.add(TweenLite.to(parts.tail, 0.5, { y: 20 }), "tailOpen")
			.to(parts.head, 0.5, { y: -10 }, "headOpen");
	}

	public static lockTopChevronSuccess(parts: ChevronParts): TimelineLite {
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

	public static spinRing(ring: ElementRef, duration: number, degrees: string): TimelineLite {
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
