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
	public static clearSymbol(box: ElementRef, symbol: ElementRef): TimelineLite {
		return new TimelineLite()
			.set(symbol.nativeElement, { x: 0, y: 0, css: { className: "-=active" } })
			.set(box.nativeElement, { css: { className: "-=locked" } });
	}

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
		return new TimelineLite()
			.fromTo(
				config.symbol.nativeElement,
				2,
				{ x: config.startX, y: config.startY, scale: 0, immediateRender: false },
				{ y: config.centerY, scale: 5 }
			)
			.set(config.symbol.nativeElement, { immediateRender: false, css: { className: "+=active" } }, 0)
			.to(config.symbol.nativeElement, 2, { x: 0, y: 0, scale: 1 });
	}
}
