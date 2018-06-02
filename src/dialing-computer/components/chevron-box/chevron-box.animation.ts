import { ElementRef } from "@angular/core";

import { TimelineLite } from "gsap";

export interface ChevronBoxAnimationConfig {
	chevronBox: ElementRef;
	centerY: number;
	startX: number;
	startY: number;
	symbol: ElementRef;
}

export function anim_lockSymbolSuccess(config: ChevronBoxAnimationConfig): TimelineLite {
	let timeline = _anim_lockSymbolAttempt(config);
	timeline.to(config.chevronBox.nativeElement, 0.5, { css: { className: "+=locked" } });
	return timeline;
}

function _anim_lockSymbolAttempt(config: ChevronBoxAnimationConfig): TimelineLite {
	let timeline = new TimelineLite();
	timeline.set(config.symbol.nativeElement, { x: config.startX, y: config.startY, scale: 0 });
	timeline.set(config.symbol.nativeElement, { css: { className: "+=active" } });
	timeline.to(config.symbol.nativeElement, 2, { y: config.centerY, scale: 5 });
	timeline.to(config.symbol.nativeElement, 2, { x: 0, y: 0, scale: 1 });
	return timeline;
}
