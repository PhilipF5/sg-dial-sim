import { Component, ElementRef, EventEmitter, Output } from "@angular/core";

import { TweenLite } from "gsap";

import { GateControlService } from "dialing-computer/services";
import { GateStatus, Glyph, Glyphs } from "shared/models";
import { GateStatusService } from "shared/services";

@Component({
	selector: "keyboard",
	templateUrl: "./keyboard.component.html",
	styleUrls: ["./keyboard.component.scss"]
})
export class KeyboardComponent {
	@Output() dialAddress: EventEmitter<Glyph[]> = new EventEmitter();

	public address: Glyph[] = [];
	public keys: Glyph[] = Glyphs.standard;

	constructor(private element: ElementRef, private gateControl: GateControlService, private gateStatus: GateStatusService) {}

	ngOnInit() {
		this.gateStatus.subscribe(status => {
			if (status === GateStatus.Aborted || status === GateStatus.Shutdown) {
				this.clearAddress();
			}
		})
	}

	public backspace(): void {
		this.address.pop();
	}

	public clearAddress(): void {
		this.address = [];
	}

	public closeKeyboard(): void {
		TweenLite.to(this.element.nativeElement, 1, { css: { className: "+=minimized" } });
	}

	public isGlyphSelected(glyph: Glyph): boolean {
		return this.address.filter(item => item === glyph).length !== 0;
	}

	public selectGlyph(glyph: Glyph): void {
		if (this.address.length < 6 && !this.isGlyphSelected(glyph)) {
			this.address.push(glyph);
		}
	}

	public shutdown(): void {
		this.gateControl.shutdown();
		this.closeKeyboard();
	}

	public validateAndDial(): void {
		if (this.address.length === 6) {
			this.dialAddress.emit(this.address);
			this.closeKeyboard();
		}
	}
}
