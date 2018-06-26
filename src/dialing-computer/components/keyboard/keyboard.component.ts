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

import { Component, ElementRef, EventEmitter, OnInit, Output } from "@angular/core";

import { TweenLite } from "gsap";

import { GateControlService } from "dialing-computer/services";
import { GateStatus, Glyph, Glyphs } from "shared/models";
import { GateStatusService } from "shared/services";

@Component({
	selector: "keyboard",
	templateUrl: "./keyboard.component.html",
	styleUrls: ["./keyboard.component.scss"],
})
export class KeyboardComponent implements OnInit {
	public address: Glyph[] = [];
	@Output() dialAddress: EventEmitter<Glyph[]> = new EventEmitter();
	public isDialingAvailable: boolean;
	public keys: Glyph[] = Glyphs.standard;

	private get element(): HTMLElement {
		return this._element.nativeElement;
	}

	constructor(
		private _element: ElementRef,
		private gateControl: GateControlService,
		private gateStatus: GateStatusService
	) {}

	ngOnInit() {
		this.gateStatus.subscribe(status => {
			switch (status) {
				case GateStatus.Idle:
					this.isDialingAvailable = true;
					break;
				case GateStatus.Aborted:
				case GateStatus.Shutdown:
					this.clearAddress();
				default:
					this.isDialingAvailable = false;
			}
		});
	}

	public backspace(): void {
		this.address.pop();
	}

	public clearAddress(): void {
		this.address = [];
	}

	public closeKeyboard(): void {
		TweenLite.to(this.element, 1, { css: { className: "+=minimized" } });
	}

	public isGlyphSelected(glyph: Glyph): boolean {
		return !!this.address.find(item => item === glyph);
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
