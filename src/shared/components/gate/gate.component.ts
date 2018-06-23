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

import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";

import { TimelineLite, TweenMax } from "gsap";

import { ChevronActivation } from "dialing-computer/models";
import { GateControlService } from "dialing-computer/services";
import { GateAnimations } from "shared/animations";
import { ChevronDirective } from "shared/directives";
import { GateStatus, Sound } from "shared/models";
import { AudioService, GateStatusService } from "shared/services";

@Component({
	selector: "gate",
	templateUrl: "./gate.component.html",
	styleUrls: ["./gate.component.scss"],
})
export class GateComponent implements AfterViewInit, OnInit {
	@ViewChildren(ChevronDirective) private chevrons: QueryList<ChevronDirective>;
	@ViewChild("ring") private ring: ElementRef;
	private ringPosition: number = 1;

	constructor(
		private audio: AudioService,
		private gateControl: GateControlService,
		private gateStatus: GateStatusService
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
					this.audio.play(Sound.ChevronLock);
					for (let chevron of this.chevrons.filter(c => c.enabled)) {
						chevron.inactivate();
					}
					break;
			}
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
		return new TimelineLite().add(this.chevron(chevron).inactivate());
	}

	private engageChevron(chevron: number): TimelineLite {
		return new TimelineLite()
			.add(this.chevron(7).lock(true, chevron === 7), "+=1")
			.add(this.chevron(chevron).activate(), "-=1");
	}

	private resetRing(): TweenMax {
		this.ringPosition = 1;
		return TweenMax.set(this.ring.nativeElement, { rotation: 0 });
	}

	private selectAndEngage(activation: ChevronActivation): TimelineLite {
		return new TimelineLite()
			.add(this.spinTo(activation))
			.add(this.engageChevron(activation.chevron), "chevronStart");
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
