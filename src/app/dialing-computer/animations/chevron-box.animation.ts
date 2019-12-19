import { gsap } from "gsap";

export interface ChevronBoxAnimationConfig {
	chevronBox: HTMLElement;
	centerY: number;
	startX: number;
	startY: number;
	symbol: HTMLElement;
}

export class ChevronBoxAnimations {
	public static clearSymbol(box: HTMLElement, symbol: HTMLElement): gsap.core.Timeline {
		return gsap
			.timeline()
			.add([
				gsap.set(symbol, { clearProps: "color,visibility" }),
				gsap.set(box.querySelector(".chevron-symbol-box"), { clearProps: "borderColor" }),
			])
			.set(symbol, { x: 0, y: 0 });
	}

	public static flashOnActivate(box: HTMLElement): gsap.core.Timeline {
		return gsap.timeline().to(box.querySelector(".chevron-symbol-box"), {
			backgroundColor: "#add8e6",
			duration: 0.15,
			repeat: 5,
			yoyo: true,
		});
	}

	public static lockSymbolFailed(config: ChevronBoxAnimationConfig): gsap.core.Timeline {
		return this.lockSymbolAttempt(config).add(
			[
				gsap.to(config.symbol, {
					duration: 2,
					x: config.startX,
					y: config.centerY,
					scale: 5,
					ease: "power1.in",
				}),
				gsap.to(config.symbol, 2, {
					color: "var(--red-color)",
					duration: 2,
				}),
			],
			"+=0.5",
		);
	}

	public static lockSymbolSuccess(config: ChevronBoxAnimationConfig): gsap.core.Timeline {
		return this.lockSymbolAttempt(config).to(config.chevronBox.querySelector(".chevron-symbol-box"), {
			borderColor: "var(--red-color)",
			duration: 0.5,
		});
	}

	private static lockSymbolAttempt(config: ChevronBoxAnimationConfig): gsap.core.Timeline {
		return gsap
			.timeline()
			.fromTo(
				config.symbol,
				{ x: config.startX, y: config.startY, scale: 0 },
				{ duration: 2, y: config.centerY, scale: 5, immediateRender: false },
			)
			.set(config.symbol, { immediateRender: false, visibility: "visible" }, 0)
			.to(config.symbol, { duration: 2, x: 0, y: 0, scale: 1 });
	}
}
