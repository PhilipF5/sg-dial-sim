import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from "@angular/core";

import { TimelineLite } from "gsap";

import { ChevronAnimation } from "dialing-computer/models";
import { anim_lockSymbolSuccess } from "./chevron-box.animation";

@Component({
	selector: "chevron-box",
	templateUrl: "./chevron-box.component.html",
	styleUrls: ["./chevron-box.component.scss"]
})
export class ChevronBoxComponent {
	@Input() chevronEngaged: number;
	@Output() engageSymbol: EventEmitter<ChevronAnimation> = new EventEmitter();
	@Input() gatePosition: DOMRect;
	@Input() glyph: string;
	@Input() number: number;

	@ViewChild("chevronBox", { read: ElementRef })
	private chevronBox: ElementRef;

	private position: DOMRect;
	@ViewChild("symbol") private symbol: ElementRef;

	ngOnChanges(changes: SimpleChanges) {
		if (changes.chevronEngaged && this.chevronEngaged === this.number) {
			this.engageSymbol.emit({
				chevron: this.number,
				timeline: this.lockSymbolSuccess(this.gatePosition)
			});
		}
	}

	public lockSymbolSuccess(gatePosition: DOMRect): TimelineLite {
		this.updateSymbolPosition();

		let startX = gatePosition.x + gatePosition.width / 2 - this.position.x - this.position.width / 2;
		let startY = gatePosition.y - this.position.y + 50;
		let centerY = gatePosition.y + gatePosition.height / 2 - this.position.y - this.position.height / 2;

		return anim_lockSymbolSuccess({
			chevronBox: this.chevronBox,
			centerY: centerY,
			startX: startX,
			startY: startY,
			symbol: this.symbol
		});
	}

	private updateSymbolPosition(): void {
		this.position = this.symbol.nativeElement.getBoundingClientRect();
	}
}
