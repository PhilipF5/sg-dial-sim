/* SGC Computer Simulator
Copyright (C) 2018  Philip Fulgham

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. */

import { ElementRef } from "@angular/core";

import { Power1, TimelineLite, TweenMax } from "gsap";

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

	public static lockSymbolFailed(config: ChevronBoxAnimationConfig): TimelineLite {
		return this.lockSymbolAttempt(config).add([
			TweenMax.to(config.symbol.nativeElement, 2, {
				x: config.startX,
				y: config.centerY,
				scale: 5,
				ease: Power1.easeIn,
			}),
			TweenMax.to(config.symbol.nativeElement, 2, {
				css: { className: "+=failed" },
			}),
		], "+=0.5");
	}

	public static lockSymbolSuccess(config: ChevronBoxAnimationConfig): TimelineLite {
		return this.lockSymbolAttempt(config).to(config.chevronBox.nativeElement, 0.5, {
			css: { className: "+=locked" },
		});
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
