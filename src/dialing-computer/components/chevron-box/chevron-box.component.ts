import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from "@angular/core";

import { TimelineLite } from "gsap";
import { BehaviorSubject } from "rxjs";
import { filter, take } from "rxjs/operators";

import { GateControlService } from "dialing-computer/services";
import { GateStatus, Glyph } from "shared/models";
import { GateStatusService } from "shared/services";
import { ChevronBoxAnimations } from "./chevron-box.animation";

@Component({
	selector: "chevron-box",
	templateUrl: "./chevron-box.component.html",
	styleUrls: ["./chevron-box.component.scss"]
})
export class ChevronBoxComponent {
	@Input("gatePosition") gatePosition$: BehaviorSubject<DOMRect>;
	public glyph: Glyph;
	@Input() number: number;

	@ViewChild("chevronBox", { read: ElementRef })
	private chevronBox: ElementRef;

	private position: DOMRect;
	@ViewChild("symbol") private symbol: ElementRef;

	constructor(private gateControl: GateControlService, private gateStatus: GateStatusService) {}

	ngOnInit() {
		this.gateControl.activations$.pipe(filter(a => a.chevron === this.number)).subscribe(a => {
			this.glyph = a.glyph;
			this.gatePosition$.pipe(filter(pos => !!pos), take(1)).subscribe(pos => {
				a.symbolTimeline = this.lockSymbolSuccess(pos);
				this.gateControl.symbolAnimReady$.next(this.number);
			});
		});

		this.gateControl.result$.subscribe(res => {
			if (res.success) {
				ChevronBoxAnimations.flashOnActivate(this.chevronBox);
			}
		});

		this.gateStatus.subscribe(status => {
			if (status === GateStatus.Idle) {
				this.clearSymbol();
			}
		});
	}

	public clearSymbol(): void {
		ChevronBoxAnimations.clearSymbol(this.chevronBox, this.symbol);
		this.glyph = undefined;
	}

	public lockSymbolSuccess(gatePosition: DOMRect): TimelineLite {
		this.updateSymbolPosition();

		let startX = gatePosition.x + gatePosition.width / 2 - this.position.x - this.position.width / 2;
		let startY = gatePosition.y - this.position.y + 50;
		let centerY = gatePosition.y + gatePosition.height / 2 - this.position.y - this.position.height / 2;

		return ChevronBoxAnimations.lockSymbolSuccess({
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
