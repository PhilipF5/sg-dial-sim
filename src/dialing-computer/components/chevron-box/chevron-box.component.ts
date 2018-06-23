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

import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";

import { TimelineLite } from "gsap";
import { BehaviorSubject } from "rxjs";
import { filter, take } from "rxjs/operators";

import { ChevronBoxAnimations } from "dialing-computer/animations";
import { GateControlService } from "dialing-computer/services";
import { GateStatus, Glyph } from "shared/models";
import { GateStatusService } from "shared/services";

@Component({
	selector: "chevron-box",
	templateUrl: "./chevron-box.component.html",
	styleUrls: ["./chevron-box.component.scss"],
})
export class ChevronBoxComponent implements OnInit {
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
			this.gatePosition$
				.pipe(
					filter(pos => !!pos),
					take(1)
				)
				.subscribe(pos => {
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

		return ChevronBoxAnimations.lockSymbolSuccess({
			chevronBox: this.chevronBox,
			centerY: gatePosition.y + gatePosition.height / 2 - this.position.y - this.position.height / 2,
			startX: gatePosition.x + gatePosition.width / 2 - this.position.x - this.position.width / 2,
			startY: gatePosition.y - this.position.y + 50,
			symbol: this.symbol,
		});
	}

	private updateSymbolPosition(): void {
		this.position = this.symbol.nativeElement.getBoundingClientRect();
	}
}
