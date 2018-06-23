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

import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { TweenMax } from "gsap";

import { GateStatus } from "shared/models";
import { GateStatusService } from "shared/services";

@Component({
	selector: "dialing-status",
	templateUrl: "./dialing-status.component.html",
	styleUrls: ["./dialing-status.component.scss"],
})
export class DialingStatusComponent implements OnInit {
	public status: GateStatus;

	@ViewChild("statusText") private _statusText: ElementRef;

	private get statusText(): HTMLElement {
		return this._statusText.nativeElement;
	}

	constructor(private gateStatus: GateStatusService) {}

	ngOnInit() {
		this.gateStatus.subscribe(status => {
			this.status = status;
			this.updateAnimation(status);
		});
	}

	private flashNormal(): TweenMax {
		TweenMax.set(this.statusText, { css: { className: "-=red" } });
		return TweenMax.fromTo(this.statusText, 0.5, { opacity: 0 }, { opacity: 0.8 })
			.repeat(-1)
			.yoyo(true);
	}

	private flashOnce(): TweenMax {
		TweenMax.set(this.statusText, { css: { className: "-=red" } });
		return TweenMax.fromTo(this.statusText, 1, { opacity: 0 }, { opacity: 0.8 })
			.repeat(1)
			.repeatDelay(2)
			.yoyo(true);
	}

	private flashRed(): TweenMax {
		TweenMax.set(this.statusText, { css: { className: "+=red" } });
		return TweenMax.fromTo(this.statusText, 0.5, { opacity: 0 }, { opacity: 0.6 })
			.repeat(-1)
			.yoyo(true);
	}

	private hide(): void {
		TweenMax.set(this.statusText, { opacity: 0 });
	}

	private killAnimation(): void {
		TweenMax.killTweensOf(this.statusText);
	}

	private updateAnimation(status: GateStatus): void {
		this.killAnimation();
		switch (status) {
			case GateStatus.Idle:
				this.flashRed();
				break;
			case GateStatus.Active:
				this.flashNormal();
				break;
			case GateStatus.Engaged:
			case GateStatus.Shutdown:
			case GateStatus.Aborted:
				this.flashOnce();
				break;
			case GateStatus.Dialing:
				this.hide();
				break;
		}
	}
}
