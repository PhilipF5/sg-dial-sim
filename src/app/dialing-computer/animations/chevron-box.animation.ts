import { gsap } from "gsap";

export interface ChevronBoxAnimationConfig {
	chevronBox: HTMLElement;
	chevronPath: HTMLElement;
	centerY: number;
	number: number;
	startX: number;
	startY: number;
	symbol: HTMLElement;
}

export class ChevronBoxAnimations {
	public static clearSymbol(
		number: number,
		box: HTMLElement,
		symbol: HTMLElement,
		path: HTMLElement,
	): gsap.core.Timeline {
		const animations = [
			gsap.set(symbol, { clearProps: "color,visibility" }),
			gsap.set(box.querySelector(".chevron-number"), { clearProps: "opacity" }),
		];

		if (number < 8) {
			animations.push(
				gsap.set(box.querySelector(".chevron-symbol-box"), { clearProps: "borderColor,backgroundColor" }),
				gsap.set(path, { clearProps: "stroke" }),
			);
		} else {
			animations.push(gsap.set(box, { clearProps: "opacity" }));
		}

		return gsap.timeline().add(animations).set(symbol, { x: 0, y: 0 });
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
				gsap.to(config.symbol, {
					color: "var(--red-color)",
					duration: 2,
				}),
			],
			"+=0.5",
		);
	}

	public static lockSymbolSuccess(config: ChevronBoxAnimationConfig): gsap.core.Timeline {
		const animations = [gsap.set(config.chevronBox.querySelector(".chevron-number"), { opacity: 1 })];

		if (config.number < 8) {
			animations.push(
				gsap.set(config.chevronBox.querySelector(".chevron-symbol-box"), {
					backgroundColor: "rgb(255 0 0 / 10%)",
					borderColor: "var(--red-color)",
				}),
				gsap.set(config.chevronPath, { stroke: "var(--red-color)" }),
			);
		}

		return this.lockSymbolAttempt(config).add(animations);
	}

	private static lockSymbolAttempt(config: ChevronBoxAnimationConfig): gsap.core.Timeline {
		const timeline = gsap.timeline();

		if (config.number >= 8) {
			timeline.set(config.chevronBox, { opacity: 1 });
		}

		return timeline
			.fromTo(
				config.symbol,
				{ x: config.startX, y: config.startY, scale: 0 },
				{ duration: 2, y: config.centerY, scale: 5, immediateRender: false },
			)
			.set(config.symbol, { immediateRender: false, visibility: "visible" }, 0)
			.to(config.symbol, { duration: 2, x: 0, y: 0, scale: config.number >= 8 ? 1.5 : 1 });
	}
}
