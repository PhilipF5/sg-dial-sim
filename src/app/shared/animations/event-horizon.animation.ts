import { gsap } from "gsap";

export class EventHorizonAnimations {
	private static activatingGradient = {
		background:
			"radial-gradient(circle at center, rgb(255, 255, 255) 0%, rgb(128, 158, 255, 0.5) 40%, rgba(0, 0, 0, 0) 60%",
	};

	private static activeGradient = {
		background:
			"radial-gradient(circle at center, rgba(0, 119, 255, 0.8) 0%, rgba(0, 60, 255, 0.5) 40%, rgba(0, 0, 0, 0) 60%",
	};

	public static activeGlow(elem: HTMLElement): gsap.core.Timeline {
		return gsap
			.timeline()
			.fromTo(elem, { scale: 3 }, { duration: 1, scale: 2.75, ease: "power1.inOut", repeat: -1, yoyo: true });
	}

	public static clear(elem: HTMLElement): gsap.core.Timeline {
		return gsap.timeline().set(elem, { clearProps: "all" });
	}

	public static inactiveFlasher(elem: HTMLElement): gsap.core.Timeline {
		return gsap
			.timeline()
			.add([
				gsap.fromTo(elem, { scale: 0 }, { duration: 0.5, scale: 1, ease: "power4.in", repeat: -1, yoyo: true }),
				gsap.set(elem, { opacity: 1 }),
			]);
	}

	public static gateOpen(elem: HTMLElement): gsap.core.Timeline {
		return gsap.timeline().add(this.kawoosh(elem));
	}

	public static kawoosh(elem: HTMLElement): gsap.core.Timeline {
		return gsap
			.timeline()
			.to(elem, 0.5, { scale: 0, ease: "power4.out" })
			.set(elem, { immediateRender: false, ...this.activatingGradient })
			.to(elem, 1, { scale: 4, ease: "power1.inOut" })
			.to(elem, 2.5, { scale: 3, ease: "elastic.inOut", ...this.activeGradient });
	}

	public static shutdown(elem: HTMLElement): gsap.core.Timeline {
		return gsap
			.timeline()
			.set(elem, { immediateRender: false, ...this.activeGradient })
			.to(elem, 1.5, { scale: 4, ease: "power1.inOut", ...this.activatingGradient })
			.to(elem, 0.5, { scale: 0, ease: "power4.in" })
			.to(elem, 1, { scale: 5, opacity: 0 })
			.set(elem, { immediateRender: false, clearProps: "background" });
	}
}
