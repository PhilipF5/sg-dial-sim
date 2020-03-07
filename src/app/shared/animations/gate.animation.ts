import { ElementRef } from "@angular/core";
import { ChevronParts } from "app/shared/models";
import { gsap } from "gsap";

export class GateAnimations {
	public static activateChevron(parts: ChevronParts): gsap.core.Timeline {
		return gsap
			.timeline()
			.add([
				gsap.to(parts.head, { duration: 0.5, fill: "red", stroke: "red" }),
				gsap.to(parts.tail, { duration: 0.5, stroke: "red" }),
			]);
	}

	public static inactivateChevron(parts: ChevronParts): gsap.core.Timeline {
		return gsap
			.timeline()
			.add([
				gsap.to(parts.head, { duration: 0.5, y: 0, fill: "black", stroke: "white" }),
				gsap.to(parts.tail, { duration: 0.5, y: 0, stroke: "white" }),
			]);
	}

	public static lockTopChevronAttempt(parts: ChevronParts): gsap.core.Timeline {
		return gsap
			.timeline()
			.add(gsap.to(parts.tail, { duration: 0.5, y: 20 }), "tailOpen")
			.to(parts.head, { duration: 0.5, y: -10 }, "headOpen");
	}

	public static lockTopChevronSuccess(parts: ChevronParts): gsap.core.Timeline {
		return gsap
			.timeline()
			.add(
				[
					gsap.to(parts.tail, { duration: 0.5, stroke: "red" }),
					gsap.to(parts.head, { duration: 0.5, fill: "red", stroke: "red" }),
				],
				"light",
			)
			.add("lock", "+=0.5")
			.add(gsap.to([parts.tail, parts.head], { duration: 0.5, y: 0 }), "lock");
	}

	public static spinRing(ring: ElementRef, duration: number, degrees: string): gsap.core.Timeline {
		return gsap
			.timeline()
			.to(ring.nativeElement, {
				duration: 1,
				rotation: degrees.substr(0, 2) + "4.61538",
				transformOrigin: "center center",
				ease: "power1.in",
			})
			.to(ring.nativeElement, {
				duration,
				rotation: degrees,
				transformOrigin: "center center",
				ease: "none",
			})
			.to(ring.nativeElement, {
				duration: 1,
				rotation: degrees.substr(0, 2) + "4.61538",
				transformOrigin: "center center",
				ease: "power1.out",
			});
	}
}
