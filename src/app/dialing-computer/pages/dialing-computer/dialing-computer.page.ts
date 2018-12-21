import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { TweenMax } from "gsap";
import { BehaviorSubject } from "rxjs";

import { KeyboardComponent } from "app/dialing-computer/components";
import { GateControlService } from "app/dialing-computer/services";
import { GateComponent } from "app/shared/components";
import { GateStatus, Glyph, Glyphs } from "app/shared/models";
import { GateStatusService } from "app/shared/services";

@Component({
	selector: "dialing-computer",
	templateUrl: "./dialing-computer.page.html",
	styleUrls: ["./dialing-computer.page.scss"],
})
export class DialingComputerPage implements OnInit {
	public authCode: string = "10183523652-4354393";
	public destination: string;
	public footerMenuButtons: any = [
		{ text: "Keyboard", callback: () => this.openKeyboard() },
		{ text: "Shutdown", callback: () => this.shutdown() },
	];
	public gatePosition$: BehaviorSubject<DOMRect> = new BehaviorSubject(null);
	public glyphs: Glyph[] = [];
	public status: GateStatus;
	public user: string = "W. Harriman";

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

	constructor(private gateControl: GateControlService, private gateStatus: GateStatusService, private router: Router) {}

	ngOnInit() {
		this.gateControl.result$.subscribe(
			res => (this.destination = res.destination && res.destination.name.toUpperCase())
		);
		this.gateStatus.subscribe(status => {
			if (status === GateStatus.Idle) {
				this.destination = undefined;
			}
		});
	}

	public beginDialing(address: Glyph[]): void {
		address.push(Glyphs.pointOfOrigin);
		this.glyphs = address;
		this.gateStatus.dialing();
		this.runDialingSequence();
	}

	public closeKeyboard(): void {
		TweenMax.to(this.keyboard, 1, { css: { className: "+=minimized" } });
	}

	public goToAddressBook(): void {
		this.router.navigate(["/dialing-computer/address-book"]);
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
