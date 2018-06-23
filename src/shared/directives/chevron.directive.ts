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

import { AfterViewInit, Directive, ElementRef, Input, OnInit } from "@angular/core";

import { TimelineLite } from "gsap";

import { GateAnimations } from "shared/animations";
import { ChevronParts, Sound } from "shared/models";
import { AudioService } from "shared/services";

@Directive({ selector: "[chevron]" })
export class ChevronDirective implements AfterViewInit, OnInit {
	@Input() chevron: number;
	public enabled: boolean;

	private parts: ChevronParts;

	constructor(private audio: AudioService, private elem: ElementRef) {}

	ngAfterViewInit() {
		let elem = this.elem.nativeElement;
		this.parts = {
			head: elem.querySelector(".chevron-head"),
			tail: elem.querySelector(".chevron-tail")
		};
	}

	ngOnInit() {
		this.enabled = this.chevron <= 7;
	}

	public activate(): TimelineLite {
		return GateAnimations.activateChevron(this.parts);
	}

	public inactivate(): TimelineLite {
		return GateAnimations.inactivateChevron(this.parts);
	}

	public lock(succeed: boolean = true, final: boolean = false): TimelineLite {
		let timeline = new TimelineLite();
		timeline.add(
			GateAnimations.lockTopChevronAttempt(this.parts)
				.add(() => this.audio.play(Sound.ChevronOpen), "tailOpen")
				.add(() => this.audio.play(Sound.ChevronOpen), "headOpen")
		);
		if (succeed) {
			timeline.add(
				GateAnimations.lockTopChevronSuccess(this.parts)
					.add(() => this.audio.play(Sound.ChevronLight), "light")
					.add(() => this.audio.play(Sound.ChevronLock), "lock")
			);
		}
		if (!final) {
			timeline.add(GateAnimations.inactivateChevron(this.parts), "+=0.5");
		}
		return timeline;
	}
}
