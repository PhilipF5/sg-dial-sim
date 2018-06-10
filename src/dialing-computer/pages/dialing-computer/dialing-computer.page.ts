import { Component, ElementRef, ViewChild } from "@angular/core";

import { TweenMax } from "gsap";
import { BehaviorSubject } from "rxjs";

import { KeyboardComponent } from "dialing-computer/components";
import { GateControlService } from "dialing-computer/services";
import { GateComponent } from "shared/components";
import { GateStatus, Glyph, Glyphs } from "shared/models";
import { GateStatusService } from "shared/services";

@Component({
	selector: "dialing-computer",
	templateUrl: "./dialing-computer.page.html",
	styleUrls: ["./dialing-computer.page.scss"],
})
export class DialingComputerPage {
	public authCode = "10183523652-4354393";
	public footerMenuButtons: any = [
		{ text: "Keyboard", callback: () => this.openKeyboard() },
		{ text: "Shutdown", callback: () => this.shutdown() },
	];
	public gatePosition$: BehaviorSubject<DOMRect> = new BehaviorSubject(null);
	public glyphs: Glyph[] = [];
	public status: GateStatus;

	@ViewChild("footerMenu", { read: ElementRef })
	private _footerMenu: ElementRef;

	private get footerMenu(): HTMLElement {
		return this._footerMenu.nativeElement;
	}

	private footerMenuIsOpen: boolean = false;

	@ViewChild(GateComponent, { read: ElementRef })
	private _gateElement: ElementRef;

	private get gateElement(): HTMLElement {
		return this._gateElement.nativeElement;
	}

	@ViewChild(KeyboardComponent, { read: ElementRef })
	private _keyboard: ElementRef;

	private get keyboard(): HTMLElement {
		return this._keyboard.nativeElement;
	}

	constructor(private gateControl: GateControlService, private gateStatus: GateStatusService) {}

	public beginDialing(address: Glyph[]): void {
		address.push(Glyphs.pointOfOrigin);
		this.glyphs = address;
		this.gateStatus.dialing();
		this.runDialingSequence();
	}

	public closeKeyboard(): void {
		TweenMax.to(this.keyboard, 1, { css: { className: "+=minimized" } });
	}

	public keyboardStartDialingHandler(event: Glyph[]): void {
		this.beginDialing(event);
	}

	public onFooterMenuClick(): void {
		TweenMax.to(this.footerMenu, 1, { scale: +!this.footerMenuIsOpen });
		this.footerMenuIsOpen = !this.footerMenuIsOpen;
	}

	public openKeyboard(): void {
		TweenMax.to(this.keyboard, 1, { css: { className: "-=minimized" } });
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
		this.gatePosition$.next(this.gateElement.getBoundingClientRect() as DOMRect);
	}
}
