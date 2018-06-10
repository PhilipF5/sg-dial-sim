import { Component, ElementRef, NgZone, ViewChild } from "@angular/core";

import { Power4, TimelineLite, TweenLite, TweenMax } from "gsap";
import { BehaviorSubject } from "rxjs";

import { KeyboardComponent } from "dialing-computer/components";
import { GateControlService } from "dialing-computer/services";
import { GateComponent } from "shared/components";
import { GateStatus, Glyph, Glyphs } from "shared/models";
import { GateStatusService } from "shared/services";

@Component({
	selector: "dialing-computer",
	templateUrl: "./dialing-computer.page.html",
	styleUrls: ["./dialing-computer.page.scss"]
})
export class DialingComputerPage {
	public authCode = "10183523652-4354393";
	public footerMenuButtons: any = [
		{ text: "Keyboard", callback: () => this.openKeyboard() },
		{ text: "Shutdown", callback: () => this.shutdown() }
	];
	public gatePosition$: BehaviorSubject<DOMRect> = new BehaviorSubject(null);
	public glyphs: Glyph[] = [];
	public status: GateStatus;

	@ViewChild("footerMenu", { read: ElementRef })
	private footerMenu: ElementRef;

	private footerMenuIsOpen: boolean = false;

	@ViewChild(GateComponent, { read: ElementRef })
	private gateElement: ElementRef;

	@ViewChild(KeyboardComponent, { read: ElementRef })
	private keyboard: ElementRef;

	private sequenceTimeline: TimelineLite = new TimelineLite();

	constructor(private gateControl: GateControlService, private gateStatus: GateStatusService, private ngZone: NgZone) {}

	public beginDialing(address: Glyph[]): void {
		address.push(Glyphs.pointOfOrigin);
		this.glyphs = address;
		this.gateStatus.dialing();
		this.runDialingSequence();
	}

	public closeKeyboard(): void {
		TweenMax.to(this.keyboard.nativeElement, 1, { css: { className: "+=minimized" } });
	}

	public keyboardStartDialingHandler(event: Glyph[]): void {
		this.beginDialing(event);
	}

	public onFooterMenuClick(): void {
		TweenLite.to(this.footerMenu.nativeElement, 1, { scale: +!this.footerMenuIsOpen });
		this.footerMenuIsOpen = !this.footerMenuIsOpen;
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
