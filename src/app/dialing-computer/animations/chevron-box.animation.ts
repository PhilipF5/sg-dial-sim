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
			repeat: 7,
			yoyo: true,
		});
	}

	public static lockSymbolFailed(config: ChevronBoxAnimationConfig): gsap.core.Timeline {
		return this.lockSymbolAttempt(config).add(
			[
				gsap.to(config.symbol, {
					duration: 0.75,
					x: config.startX,
					y: config.centerY,
					scale: 5,
					ease: "none",
				}),
				gsap.set(config.symbol, {
					color: "var(--red-color)",
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
				gsap.set(config.chevronBox, { clearProps: "zIndex" }),
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
			.set(config.chevronBox, { zIndex: 10 })
			.set(config.symbol, { immediateRender: false, visibility: "visible" }, 0)
			.fromTo(
				config.symbol,
				{ x: config.startX, y: config.startY, scale: 0 },
				{ duration: 0.75, ease: "none", y: config.centerY, scale: 5, immediateRender: false },
			)
			.to(
				config.symbol,
				{ duration: 0.75, ease: "none", x: 0, y: 0, scale: config.number >= 8 ? 1.5 : 1 },
				"+=2",
			);
	}
}
