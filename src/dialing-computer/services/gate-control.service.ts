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
import { Destination, GateStatus, Glyph } from "shared/models";
import { GateNetworkService, GateStatusService } from "shared/services";

@Injectable()
export class GateControlService {
	public activations$: Subject<ChevronActivation> = new Subject();
	public chevronAnimReady$: Subject<number> = new Subject();
	public result$: Subject<DialingResult> = new Subject();
	public symbolAnimReady$: Subject<number> = new Subject();

	private activationQueue: ChevronActivation[] = [];
	private address: Glyph[];
	private destination: Destination;
	private dialingSequence: TimelineLite;
	private status: GateStatus;

	constructor(
		private gateNetwork: GateNetworkService,
		private gateStatus: GateStatusService,
		private ngZone: NgZone
	) {
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

		this.result$.subscribe(res => {
			if (res.destination) {
				setTimeout(() => {
					this.gateStatus.active();
				}, 2000);
			} else {
				setTimeout(() => {
					this.shutdown();
				}, 7000);
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

			if (chevron === this.address.length) {
				timeline.add(() => this.ngZone.run(() => this.result$.next({ destination: this.destination })), "+=1");
			} else if (chevron === this.address.length - 1) {
				timeline.add(() =>
					this.ngZone.run(() => {
						this.destination = this.gateNetwork.getActiveAddress(this.address);
						let activation = {
							chevron: this.address.length,
							fail: !this.destination,
							glyph: this.address[chevron],
						};

						this.activationQueue.push(activation);
						this.activations$.next(activation);
					})
				);
			}
		});

		this.symbolAnimReady$.pipe(takeWhile(chevron => chevron <= this.activationQueue.length)).subscribe(chevron => {
			timeline.add(this.activationQueue[chevron - 1].symbolTimeline, `chevron${chevron}Start`);

			if (!this.activationQueue[chevron - 1].fail) {
				timeline.add(() => this.ngZone.run(() => this.gateStatus.engaged()), `chevron${chevron}Start`);
			}
		});

		for (let activation of this.activationQueue) {
			this.activations$.next(activation);
		}

		this.dialingSequence = timeline;
	}

	public loadAddress(address: Glyph[]): void {
		this.address = address;
		if (this.activationQueue.length > 0) {
			this.activationQueue = [];
		}

		for (let i = 0; i < address.length - 1; i++) {
			this.activationQueue.push({
				chevron: i + 1,
				glyph: address[i],
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
		this.address = undefined;
		this.chevronAnimReady$ = new Subject();
		this.symbolAnimReady$ = new Subject();
	}
}
