import { ElementRef } from "@angular/core";

import { TimelineLite, TweenMax } from "gsap";

export interface ChevronBoxAnimationConfig {
	chevronBox: ElementRef;
	centerY: number;
	startX: number;
	startY: number;
	symbol: ElementRef;
}

export class ChevronBoxAnimations {
	public static flashOnActivate(box: ElementRef): TimelineLite {
		return new TimelineLite().add(
			TweenMax.to(box.nativeElement.querySelector(".chevron-symbol-box"), 0.15, { backgroundColor: "#add8e6" })
				.repeat(5)
				.yoyo(true)
		);
	}

	public static lockSymbolSuccess(config: ChevronBoxAnimationConfig): TimelineLite {
		let timeline = this.lockSymbolAttempt(config);
		timeline.to(config.chevronBox.nativeElement, 0.5, { css: { className: "+=locked" } });
		return timeline;
	}

	private static lockSymbolAttempt(config: ChevronBoxAnimationConfig): TimelineLite {
		let timeline = new TimelineLite();
		timeline.set(config.symbol.nativeElement, { x: config.startX, y: config.startY, scale: 0 });
		timeline.set(config.symbol.nativeElement, { css: { className: "+=active" } });
		timeline.to(config.symbol.nativeElement, 2, { y: config.centerY, scale: 5 });
		timeline.to(config.symbol.nativeElement, 2, { x: 0, y: 0, scale: 1 });
		return timeline;
	}
}
