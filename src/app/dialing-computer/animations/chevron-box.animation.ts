import { Power1, TimelineLite, TweenMax } from "gsap";

export interface ChevronBoxAnimationConfig {
	chevronBox: HTMLElement;
	centerY: number;
	startX: number;
	startY: number;
	symbol: HTMLElement;
}

export class ChevronBoxAnimations {
	public static clearSymbol(box: HTMLElement, symbol: HTMLElement): TimelineLite {
		return new TimelineLite()
			.set(symbol, { css: { className: "-=active" } })
			.set(symbol, { css: { className: "-=failed" } })
			.set(symbol, { x: 0, y: 0 })
			.set(box, { css: { className: "-=locked" } });
	}

	public static flashOnActivate(box: HTMLElement): TimelineLite {
		return new TimelineLite().add(
			TweenMax.to(box.querySelector(".chevron-symbol-box"), 0.15, { backgroundColor: "#add8e6" })
				.repeat(5)
				.yoyo(true)
		);
	}

	public static lockSymbolFailed(config: ChevronBoxAnimationConfig): TimelineLite {
		return this.lockSymbolAttempt(config).add(
			[
				TweenMax.to(config.symbol, 2, {
					x: config.startX,
					y: config.centerY,
					scale: 5,
					ease: Power1.easeIn,
				}),
				TweenMax.to(config.symbol, 2, {
					css: { className: "+=failed" },
				}),
			],
			"+=0.5"
		);
	}

	public static lockSymbolSuccess(config: ChevronBoxAnimationConfig): TimelineLite {
		return this.lockSymbolAttempt(config).to(config.chevronBox, 0.5, {
			css: { className: "+=locked" },
		});
	}

	private static lockSymbolAttempt(config: ChevronBoxAnimationConfig): TimelineLite {
		return new TimelineLite()
			.fromTo(
				config.symbol,
				2,
				{ x: config.startX, y: config.startY, scale: 0, immediateRender: false },
				{ y: config.centerY, scale: 5 }
			)
			.set(config.symbol, { immediateRender: false, css: { className: "+=active" } }, 0)
			.to(config.symbol, 2, { x: 0, y: 0, scale: 1 });
	}
}
