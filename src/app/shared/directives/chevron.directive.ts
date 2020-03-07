import { AfterViewInit, Directive, ElementRef, Input, OnInit } from "@angular/core";
import { GateAnimations } from "app/shared/animations";
import { ChevronParts, Sound } from "app/shared/models";
import { AudioService } from "app/shared/services";
import { gsap } from "gsap";

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
			tail: elem.querySelector(".chevron-tail"),
		};
	}

	ngOnInit() {
		this.enabled = this.chevron <= 7;
	}

	public activate(): gsap.core.Timeline {
		return GateAnimations.activateChevron(this.parts);
	}

	public inactivate(): gsap.core.Timeline {
		return GateAnimations.inactivateChevron(this.parts);
	}

	public lock(succeed: boolean = true, final: boolean = false): gsap.core.Timeline {
		let timeline = gsap.timeline();
		timeline.add(
			GateAnimations.lockTopChevronAttempt(this.parts)
				.add(() => this.audio.play(Sound.ChevronOpen), "tailOpen")
				.add(() => this.audio.play(Sound.ChevronOpen), "headOpen"),
		);
		if (succeed) {
			timeline.add(
				GateAnimations.lockTopChevronSuccess(this.parts)
					.add(() => this.audio.play(Sound.ChevronLight), "light")
					.add(() => this.audio.play(Sound.ChevronLock), "lock"),
			);
		}
		if (!final) {
			timeline.add(GateAnimations.inactivateChevron(this.parts), "+=0.5");
		}
		return timeline;
	}
}
