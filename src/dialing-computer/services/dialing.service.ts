import { Injectable, NgZone } from "@angular/core";

import { TimelineLite } from "gsap";
import { Subject } from "rxjs";
import { takeWhile } from "rxjs/operators";

import { ChevronActivation, DialingResult } from "dialing-computer/models";
import { GateStatus, Glyph } from "shared/models";
import { GateStatusService } from "shared/services";

@Injectable()
export class DialingService {
	public activations$: Subject<ChevronActivation> = new Subject();
	public chevronAnimReady$: Subject<number> = new Subject();
	public result$: Subject<DialingResult> = new Subject();
	public symbolAnimReady$: Subject<number> = new Subject();

	private activationQueue: ChevronActivation[] = [];

	constructor(private gateStatus: GateStatusService, private ngZone: NgZone) {}

	public dial(): void {
		let timeline = new TimelineLite();

		this.chevronAnimReady$.pipe(takeWhile(chevron => chevron <= this.activationQueue.length)).subscribe(chevron => {
			timeline.add(
				[this.activationQueue[chevron - 1].chevronTimeline, () => this.ngZone.run(() => this.gateStatus.engaged())],
				`chevron${chevron}`
			);
			if (chevron === 7) {
				timeline.add(() => this.ngZone.run(() => this.result$.next({ success: true })), "+=1");
				timeline.add(() => this.ngZone.run(() => this.gateStatus.active()));
			}
		});
		this.symbolAnimReady$.pipe(takeWhile(chevron => chevron <= this.activationQueue.length)).subscribe(chevron => {
			timeline.add(this.activationQueue[chevron - 1].symbolTimeline, `chevron${chevron}`);
		});
		for (let activation of this.activationQueue) {
			this.activations$.next(activation);
		}
	}

	public loadAddress(address: Glyph[]): void {
		if (this.activationQueue.length > 0) {
			this.activationQueue = [];
		}

		for (let [index, glyph] of address.entries()) {
			this.activationQueue.push({
				chevron: index + 1,
				glyph: glyph
			});
		}
	}
}
