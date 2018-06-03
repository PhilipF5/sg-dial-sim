import { Component, ElementRef, NgZone, ViewChild } from "@angular/core";

import { Power4, TimelineLite, TweenLite, TweenMax } from "gsap";
import { BehaviorSubject } from "rxjs";

import { KeyboardComponent } from "dialing-computer/components";
import { GateControlService } from "dialing-computer/services";
import { GateComponent } from "shared/components";
import { GateStatus, Glyph } from "shared/models";
import { GateStatusService } from "shared/services";

@Component({
	selector: "dialing-computer",
	templateUrl: "./dialing-computer.page.html",
	styleUrls: ["./dialing-computer.page.scss"]
})
export class DialingComputerPage {
	public gatePosition$: BehaviorSubject<DOMRect> = new BehaviorSubject(null);
	public glyphs: Glyph[] = [];
	public status: GateStatus;

	@ViewChild(GateComponent, { read: ElementRef })
	private gateElement: ElementRef;

	@ViewChild(KeyboardComponent, { read: ElementRef })
	private keyboard: ElementRef;

	private sequenceTimeline: TimelineLite = new TimelineLite();

	constructor(private gateControl: GateControlService, private gateStatus: GateStatusService, private ngZone: NgZone) {}

	public beginDialing(address: Glyph[]): void {
		address.push({ char: "A", name: "Tau'ri" });
		this.glyphs = address;
		this.gateStatus.dialing();
		this.runDialingSequence();
	}

	public closeKeyboard(): void {
		TweenMax.to(this.keyboard.nativeElement, 1, { css: { className: "+=minimized" } });
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
		this.gateControl.shutdown();
	}

	private runDialingSequence(): void {
		this.updateGatePosition();
		this.gateControl.loadAddress(this.glyphs);
		this.gateControl.dial();
	}

	private updateGatePosition(): void {
		this.gatePosition$.next(this.gateElement.nativeElement.getBoundingClientRect());
	}
}
