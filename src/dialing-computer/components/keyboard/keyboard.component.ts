import { Component, EventEmitter, Output } from "@angular/core";

import { GateStatus, Glyph, Glyphs } from "shared/models";
import { GateStatusService } from "shared/services";

@Component({
	selector: "keyboard",
	templateUrl: "./keyboard.component.html",
	styleUrls: ["./keyboard.component.scss"]
})
export class KeyboardComponent {
	@Output() close: EventEmitter<void> = new EventEmitter();

	@Output() dialAddress: EventEmitter<Glyph[]> = new EventEmitter();

	@Output() shutdownGate: EventEmitter<void> = new EventEmitter();

	public address: Glyph[] = [];
	public keys: Glyph[] = Glyphs.standard;

	constructor(private gateStatus: GateStatusService) {}

	ngOnInit() {
		this.gateStatus.subscribe(status => {
			if (status === GateStatus.Aborted) {
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
		this.close.emit();
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
		this.shutdownGate.emit();
		this.close.emit();
		this.clearAddress();
	}

	public validateAndDial(): void {
		if (this.address.length === 6) {
			this.dialAddress.emit(this.address);
			this.close.emit();
		}
	}
}
