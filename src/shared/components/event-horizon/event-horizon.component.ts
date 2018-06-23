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

import { Component, ElementRef, NgZone, OnInit } from "@angular/core";

import { TimelineLite, TweenMax } from "gsap";

import { EventHorizonAnimations } from "shared/animations";
import { GateStatus } from "shared/models";
import { AudioService, GateStatusService } from "shared/services";

@Component({
	selector: "event-horizon",
	templateUrl: "./event-horizon.component.html",
	styleUrls: ["./event-horizon.component.scss"],
})
export class EventHorizonComponent implements OnInit {
	private readonly ignoredStatuses = [GateStatus.Dialing, GateStatus.Engaged];

	private get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	constructor(
		private audio: AudioService,
		private _elem: ElementRef,
		private gateStatus: GateStatusService,
		private ngZone: NgZone
	) {}

	ngOnInit() {
		this.gateStatus.subscribe(status => {
			if (!this.ignoredStatuses.includes(status)) {
				this.setAnimation(status);
			}
		});
	}

	private setAnimation(status: GateStatus): TimelineLite {
		TweenMax.killTweensOf(this.elem);
		switch (status) {
			case GateStatus.Idle:
				return EventHorizonAnimations.inactiveFlasher(this.elem);
			case GateStatus.Active:
				return EventHorizonAnimations.gateOpen(this.elem).add(() => this.audio.startEventHorizon(), 0);
			case GateStatus.Shutdown:
				return new TimelineLite()
					.add(EventHorizonAnimations.shutdown(this.elem))
					.add(() => this.audio.stopEventHorizon(), 0)
					.add(() => this.ngZone.run(() => this.gateStatus.idle()), "+=1");
		}
	}
}
