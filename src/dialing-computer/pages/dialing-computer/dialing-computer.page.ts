import { Component, ElementRef, NgZone, QueryList, ViewChild, ViewChildren } from "@angular/core";

import { Power4, TimelineLite, TweenLite, TweenMax } from "gsap";

import { ChevronBoxComponent, KeyboardComponent } from "dialing-computer/components";
import { GateComponent } from "shared/components";
import { Glyph } from "shared/models";

@Component({
	selector: "dialing-computer",
	templateUrl: "./dialing-computer.page.html",
	styleUrls: ["./dialing-computer.page.scss"]
})
export class DialingComputerPage {
	public chevronEngaged: number = 0;
	public gatePosition: DOMRect;
	public glyphs: Glyph[] = [];
	public status: string = "IDLE";

	@ViewChild(GateComponent, { read: ElementRef })
	private gateElement: ElementRef;

	@ViewChild(KeyboardComponent, { read: ElementRef })
	private keyboard: ElementRef;

	private sequenceTimeline: TimelineLite = new TimelineLite();

	constructor(private ngZone: NgZone) {}

	public beginDialing(address: Glyph[]): void {
		address.push(new Glyph({ char: "A", name: "Tau'ri"}));
		this.glyphs = address;
		this.status = "DIALING";
		this.runDialingSequence();
	}

	public closeKeyboard(): void {
		TweenMax.to(this.keyboard.nativeElement, 1, { css: { className: "+=minimized" } });
	}

	public engageSymbolHandler(event: { chevron: number, timeline: TimelineLite }): void {
		this.sequenceTimeline.add(this.animateChevron(event.chevron, event.timeline));
	}

	public keyboardCloseHandler(): void {
		this.closeKeyboard();
	}

	public keyboardShutdownHandler(): void {
		this.shutdown();
	}

	public keyboardStartDialingHandler(event: Glyph[]): void {
		this.beginDialing(event);
	}

	public openKeyboard(): void {
		TweenMax.to(this.keyboard.nativeElement, 1, { css: { className: "-=minimized" } });
	}

	public shutdown(): void {
		this.status = "SHUTDOWN";
	}

	private animateChevron(chevron: number, engageSymbolTimeline: TimelineLite): TimelineLite {
		let chevronTimeline = new TimelineLite();
		chevronTimeline.add([
			engageSymbolTimeline,
			() => this.ngZone.run(() => this.status = "ENGAGED")
		]);
		chevronTimeline.add(
			[
				TweenLite.to(`.chevron-${chevron} > .chevron-tail`, 0.5, { stroke: "red" }),
				TweenLite.to(`.chevron-${chevron} > .chevron-head`, 0.5, { fill: "red" })
			],
			"-=0.5"
		);
		let lockAnimation = chevron === 7 ? this.animateLocking(true) : this.animateLocking();
		chevronTimeline.add(lockAnimation, 2);
		return chevronTimeline;
	}

	private animateLocking(finish?: boolean, fail?: boolean): TimelineLite {
		let chevronTimeline = new TimelineLite();
		chevronTimeline.add([
			TweenLite.to(`.chevron-tail.chevron-7`, 0.5, { y: 20 }),
			TweenLite.to(`.chevron-7.chevron-back`, 0.5, { y: 20 })
		]);
		chevronTimeline.to(`.chevron-head.chevron-7`, 0.5, { y: -10 });
		if (!fail) {
			chevronTimeline.add([
				TweenLite.to(`.chevron-7.chevron-tail-border`, 0.5, { stroke: "red" }),
				TweenLite.to(`.chevron-7.chevron-head`, 0.5, { fill: "red" })
			]);
			chevronTimeline.add(
				[
					TweenLite.to(`.chevron-tail.chevron-7`, 0.5, { y: 0 }),
					TweenLite.to(`.chevron-head.chevron-7`, 0.5, { y: 0 }),
					TweenLite.to(`.chevron-7.chevron-back`, 0.5, { y: 0 })
				],
				"+=0.5"
			);
		}
		if (!finish) {
			chevronTimeline.add(
				[
					TweenLite.to(`.chevron-7.chevron-tail-border`, 0.5, { stroke: "#87cefa" }),
					TweenLite.to(`.chevron-7.chevron-head`, 0.5, { fill: "none" })
				],
				"+=0.5"
			);
			chevronTimeline.add(() => this.ngZone.run(() => this.status = "DIALING"));
		} else {
			chevronTimeline.add(
				[
					TweenMax.to(`.chevron-symbol-box`, 0.15, { backgroundColor: "#add8e6" })
						.repeat(5)
						.yoyo(true)
				],
				"-=0.5"
			);
			chevronTimeline.add(() => this.ngZone.run(() => this.status = "ACTIVE"));
		}
		return chevronTimeline;
	}

	private runDialingSequence(): void {
		this.updateGatePosition();
		for (let i = 1; i <= 7; i++) {
			setTimeout(() => {
				this.chevronEngaged = i;
			}, i * 1000);
		}
	}

	private updateGatePosition(): void {
		this.gatePosition = this.gateElement.nativeElement.getBoundingClientRect();
	}
}
