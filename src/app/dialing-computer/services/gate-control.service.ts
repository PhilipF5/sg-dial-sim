import { Injectable, NgZone } from "@angular/core";

import { TimelineLite } from "gsap";
import { Subject } from "rxjs";
import { takeWhile } from "rxjs/operators";

import { ChevronActivation, DialingResult } from "app/dialing-computer/models";
import { Destination, GateStatus, Glyph } from "app/shared/models";
import { AlertService, GateNetworkService, GateStatusService } from "app/shared/services";

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
		private alert: AlertService,
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
				this.alert.alerts.next({
					critical: true,
					duration: 7000,
					message: "404 Not Found",
					title: "Cannot Establish Connection",
				});
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
