import { Elastic, Power1, Power4, TimelineLite, TweenMax } from "gsap";

export class EventHorizonAnimations {
	public static activeGlow(elem: HTMLElement): TimelineLite {
		return new TimelineLite().add(
			TweenMax.fromTo(elem, 1, { scale: 3, ease: Power1.easeInOut }, { scale: 2.75, ease: Power1.easeInOut })
				.repeat(-1)
				.yoyo(true)
		);
	}

	public static inactiveFlasher(elem: HTMLElement): TimelineLite {
		return new TimelineLite().add([
			TweenMax.fromTo(elem, 0.5, { scale: 0, ease: Power4.easeIn }, { scale: 1, ease: Power4.easeIn })
				.repeat(-1)
				.yoyo(true),
			TweenMax.set(elem, { opacity: 1 }),
		]);
	}

	public static gateOpen(elem: HTMLElement): TimelineLite {
		return new TimelineLite().add(this.kawoosh(elem)).add(this.activeGlow(elem));
	}

	public static kawoosh(elem: HTMLElement): TimelineLite {
		return new TimelineLite()
			.to(elem, 0.5, { scale: 0, ease: Power4.easeOut })
			.set(elem, { immediateRender: false, css: { className: "+=active" } })
			.to(elem, 1, { scale: 4, ease: Power1.easeInOut })
			.to(elem, 2.5, { scale: 3, ease: Elastic.easeInOut });
	}

	public static shutdown(elem: HTMLElement): TimelineLite {
		return new TimelineLite()
			.to(elem, 2, { scale: 4, ease: Power1.easeInOut })
			.to(elem, 1, { scale: 0, ease: Power4.easeIn })
			.to(elem, 1, { scale: 5, opacity: 0 })
			.set(elem, { immediateRender: false, css: { className: "-=active" } });
	}
}
