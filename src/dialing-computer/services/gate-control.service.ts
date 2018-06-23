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

import { Injectable, NgZone } from "@angular/core";

import { TimelineLite } from "gsap";
import { Subject } from "rxjs";
import { takeWhile } from "rxjs/operators";

import { ChevronActivation, DialingResult } from "dialing-computer/models";
import { GateStatus, Glyph } from "shared/models";
import { GateStatusService } from "shared/services";

@Injectable()
export class GateControlService {
	public activations$: Subject<ChevronActivation> = new Subject();
	public chevronAnimReady$: Subject<number> = new Subject();
	public result$: Subject<DialingResult> = new Subject();
	public symbolAnimReady$: Subject<number> = new Subject();

	private activationQueue: ChevronActivation[] = [];
	private dialingSequence: TimelineLite;
	private status: GateStatus;

	constructor(private gateStatus: GateStatusService, private ngZone: NgZone) {
		this.gateStatus.subscribe(status => {
			this.status = status;
			if (!!this.dialingSequence) {
				switch (status) {
					case GateStatus.Aborted:
						this.dialingSequence.pause();
						break;
					case GateStatus.Idle:
						this.dialingSequence.clear();
						break;
				}
			}
		});
	}

	public dial(): void {
		let timeline = new TimelineLite();

		this.chevronAnimReady$.pipe(takeWhile(chevron => chevron <= this.activationQueue.length)).subscribe(chevron => {
			let chevronTimeline = this.activationQueue[chevron - 1].chevronTimeline;

			timeline
				.add(chevronTimeline, `chevron${chevron}`)
				.addLabel(
					`chevron${chevron}Start`,
					chevronTimeline.startTime() + chevronTimeline.getLabelTime("chevronStart")
				);

			if (chevron === 7) {
				timeline
					.add(() => this.ngZone.run(() => this.result$.next({ success: true })), "+=1")
					.add(() => this.ngZone.run(() => this.gateStatus.active()), "+=2");
			}
		});

		this.symbolAnimReady$.pipe(takeWhile(chevron => chevron <= this.activationQueue.length)).subscribe(chevron => {
			timeline.add(
				[
					this.activationQueue[chevron - 1].symbolTimeline,
					() => this.ngZone.run(() => this.gateStatus.engaged()),
				],
				`chevron${chevron}Start`
			);
		});

		for (let activation of this.activationQueue) {
			this.activations$.next(activation);
		}

		this.dialingSequence = timeline;
	}

	public loadAddress(address: Glyph[]): void {
		if (this.activationQueue.length > 0) {
			this.activationQueue = [];
		}

		for (let [index, glyph] of address.entries()) {
			this.activationQueue.push({
				chevron: index + 1,
				glyph: glyph,
			});
		}
	}

	public shutdown(): void {
		switch (this.status) {
			case GateStatus.Dialing:
			case GateStatus.Engaged:
				this.gateStatus.aborted();
				break;
			case GateStatus.Active:
				this.gateStatus.shutdown();
				break;
		}
		this.chevronAnimReady$ = new Subject();
		this.symbolAnimReady$ = new Subject();
	}
}
