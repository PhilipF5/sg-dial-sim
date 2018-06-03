import { ElementRef } from "@angular/core";

import { Elastic, Power1, Power4, TimelineLite, TweenMax } from "gsap";

export class EventHorizonAnimations {
	public static activeGlow(elem: ElementRef): TimelineLite {
		return new TimelineLite().add(
			TweenMax.fromTo(elem.nativeElement, 1, { scale: 3, ease: Power1.easeInOut }, { scale: 2.75, ease: Power1.easeInOut })
				.repeat(-1)
				.yoyo(true)
		);
	}

	public static inactiveFlasher(elem: ElementRef): TimelineLite {
		return new TimelineLite().add([
			TweenMax.fromTo(elem.nativeElement, 0.5, { scale: 0, ease: Power4.easeIn }, { scale: 1, ease: Power4.easeIn })
				.repeat(-1)
				.yoyo(true),
			TweenMax.set(elem.nativeElement, { opacity: 1 })
		]);
	}

	public static gateOpen(elem: ElementRef): TimelineLite {
		let timeline = new TimelineLite();
		timeline.add(this.kawoosh(elem));
		timeline.add(this.activeGlow(elem));
		return timeline;
	}

	public static kawoosh(elem: ElementRef): TimelineLite {
		let timeline = new TimelineLite();
		timeline.to(elem.nativeElement, 0.5, { scale: 0, ease: Power4.easeOut });
		timeline.set(elem.nativeElement, { css: { className: "+=active" } });
		timeline.to(elem.nativeElement, 1, { scale: 4, ease: Power1.easeInOut });
		timeline.to(elem.nativeElement, 2.5, { scale: 3, ease: Elastic.easeInOut });
		return timeline;
	}

	public static shutdown(elem: ElementRef): TimelineLite {
		let timeline = new TimelineLite();
		timeline.to(elem.nativeElement, 2, { scale: 4, ease: Power1.easeInOut });
		timeline.to(elem.nativeElement, 1, { scale: 0, ease: Power4.easeIn });
		timeline.to(elem.nativeElement, 1, { scale: 5, opacity: 0 });
		timeline.set(elem.nativeElement, { css: { className: "-=active" } });
		return timeline;
	}
}
