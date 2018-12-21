import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";

import { TimelineLite } from "gsap";
import { BehaviorSubject, Subject } from "rxjs";
import { filter, take, takeUntil } from "rxjs/operators";

import { ChevronBoxAnimations, ChevronBoxAnimationConfig } from "app/dialing-computer/animations";
import { GateControlService } from "app/dialing-computer/services";
import { GateStatus, Glyph } from "app/shared/models";
import { GateStatusService } from "app/shared/services";

@Component({
	selector: "chevron-box",
	templateUrl: "./chevron-box.component.html",
	styleUrls: ["./chevron-box.component.scss"],
})
export class ChevronBoxComponent implements OnDestroy, OnInit {
	@Input("gatePosition") gatePosition$: BehaviorSubject<DOMRect>;
	@Input() number: number;

	@ViewChild("chevronBox") private _chevronBox: ElementRef;
	@ViewChild("symbol") private _symbol: ElementRef;

	public glyph: Glyph;

	private killSubscriptions: Subject<{}> = new Subject();
	private position: DOMRect;

	private get chevronBox(): HTMLElement {
		return this._chevronBox.nativeElement;
	}

	private get symbol(): HTMLElement {
		return this._symbol.nativeElement;
	}

	constructor(private gateControl: GateControlService, private gateStatus: GateStatusService) {}

	ngOnDestroy() {
		this.killSubscriptions.next();
	}

	ngOnInit() {
		this.gateControl.activations$
			.pipe(filter(a => a.chevron === this.number), takeUntil(this.killSubscriptions))
			.subscribe(a => {
				this.glyph = a.glyph;
				this.gatePosition$.pipe(filter(pos => !!pos), take(1)).subscribe(pos => {
					a.symbolTimeline = a.fail ? this.lockSymbolFailed(pos) : this.lockSymbolSuccess(pos);
					this.gateControl.symbolAnimReady$.next(this.number);
				});
			});

		this.gateControl.result$
			.pipe(takeUntil(this.killSubscriptions))
			.subscribe(res => {
				if (res.destination) {
					ChevronBoxAnimations.flashOnActivate(this.chevronBox);
				}
			});

		this.gateStatus.status$
			.pipe(takeUntil(this.killSubscriptions))
			.subscribe(status => {
				if (status === GateStatus.Idle) {
					this.clearSymbol();
				}
			});
	}

	public clearSymbol(): void {
		ChevronBoxAnimations.clearSymbol(this.chevronBox, this.symbol);
		this.glyph = undefined;
	}

	public lockSymbolFailed(gatePosition: DOMRect): TimelineLite {
		return ChevronBoxAnimations.lockSymbolFailed(this.buildAnimationConfig(gatePosition));
	}

	public lockSymbolSuccess(gatePosition: DOMRect): TimelineLite {
		return ChevronBoxAnimations.lockSymbolSuccess(this.buildAnimationConfig(gatePosition));
	}

	private buildAnimationConfig(gatePosition: DOMRect): ChevronBoxAnimationConfig {
		this.updateSymbolPosition();

		return {
			chevronBox: this.chevronBox,
			centerY: gatePosition.y + gatePosition.height / 2 - this.position.y - this.position.height / 2,
			startX: gatePosition.x + gatePosition.width / 2 - this.position.x - this.position.width / 2,
			startY: gatePosition.y - this.position.y + 50,
			symbol: this.symbol,
		};
	}

	private updateSymbolPosition(): void {
		this.position = this.symbol.getBoundingClientRect() as DOMRect;
	}
}
