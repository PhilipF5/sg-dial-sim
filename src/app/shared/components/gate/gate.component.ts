import {
	AfterViewInit,
	Component,
	ElementRef,
	NgZone,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren,
} from "@angular/core";

import { TimelineLite, TweenMax } from "gsap";

import { ChevronActivation } from "app/dialing-computer/models";
import { GateControlService } from "app/dialing-computer/services";
import { GateAnimations } from "app/shared/animations";
import { ChevronDirective } from "app/shared/directives";
import { GateStatus, Sound } from "app/shared/models";
import { AudioService, GateStatusService } from "app/shared/services";

@Component({
	selector: "gate",
	templateUrl: "./gate.component.html",
	styleUrls: ["./gate.component.scss"],
})
export class GateComponent implements AfterViewInit, OnInit {
	@ViewChildren(ChevronDirective) private chevrons: QueryList<ChevronDirective>;
	@ViewChild("ring") private ring: ElementRef;

	private ringPosition: number = 1;
	private statusUpdateCount: number = 0;

	public get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	constructor(
		private audio: AudioService,
		private _elem: ElementRef,
		private gateControl: GateControlService,
		private gateStatus: GateStatusService,
		private ngZone: NgZone,
	) {}

	ngAfterViewInit() {
		this.gateStatus.subscribe(status => {
			switch (status) {
				case GateStatus.Aborted:
					this.audio.failRing().onended = () => {
						this.gateStatus.idle();
					};
					break;
				case GateStatus.Idle:
					this.resetRing();
					if (this.statusUpdateCount > 0) {
						this.audio.play(Sound.ChevronLock);
					}
					for (let chevron of this.chevrons.filter(c => c.enabled)) {
						this.disengageChevron(chevron.chevron);
					}
					break;
			}

			this.statusUpdateCount++;
		});
	}

	ngOnInit() {
		this.gateControl.activations$.subscribe(a => {
			a.chevronTimeline = this.selectAndEngage(a);
			this.gateControl.chevronAnimReady$.next(a.chevron);
		});
	}

	public chevron(index: number): ChevronDirective {
		return this.chevrons.find(c => c.chevron === index);
	}

	private disengageChevron(chevron: number): TimelineLite {
		return new TimelineLite().add([
			this.chevron(chevron).inactivate(),
			() => this.ngZone.run(() => this.gateStatus.chevrons.idle(chevron)),
		]);
	}

	private engageChevron(chevron: number, succeed: boolean = true): TimelineLite {
		let timeline = new TimelineLite().add(this.chevron(7).lock(succeed, chevron === 7), "+=1");

		if (succeed) {
			timeline.add(
				[
					this.chevron(chevron).activate(),
					() => this.ngZone.run(() => this.gateStatus.chevrons.engaged(chevron)),
				],
				"-=1"
			);
		} else {
			timeline.add(() => this.ngZone.run(() => this.gateStatus.chevrons.failed(chevron)));
		}

		return timeline;
	}

	private resetRing(): TweenMax {
		this.ringPosition = 1;
		return TweenMax.set(this.ring.nativeElement, { rotation: 0 });
	}

	private selectAndEngage(activation: ChevronActivation): TimelineLite {
		return new TimelineLite()
			.add(this.spinTo(activation))
			.add(this.engageChevron(activation.chevron, !activation.fail), "chevronStart");
	}

	private spinTo(activation: ChevronActivation): TimelineLite {
		let startPosition = this.ringPosition;
		this.ringPosition = activation.glyph.position;
		let degreesPerPosition = 9.2307;
		let positionsToRotate: number;
		let degreesToRotate: string;
		let direction: string;

		if (activation.chevron % 2 === 0) {
			direction = "-=";
			if (activation.glyph.position > startPosition) {
				positionsToRotate = activation.glyph.position - startPosition - 1;
			} else if (activation.glyph.position < startPosition) {
				positionsToRotate = 39 - startPosition + activation.glyph.position;
			}
		} else {
			direction = "+=";
			if (activation.glyph.position > startPosition) {
				positionsToRotate = startPosition + 39 - activation.glyph.position;
			} else if (activation.glyph.position < startPosition) {
				positionsToRotate = startPosition - activation.glyph.position - 1;
			}
		}

		degreesToRotate = direction + degreesPerPosition * positionsToRotate;
		return GateAnimations.spinRing(this.ring, positionsToRotate / 2.5, degreesToRotate)
			.add(() => this.audio.startRing(), 0)
			.add(() => this.audio.stopRing());
	}
}
