import { Component, ElementRef, Input, SimpleChanges, ViewChild } from "@angular/core";

import { TimelineLite, TweenMax } from "gsap";

import { GateStatus } from "shared/models";
import { GateStatusService } from "shared/services";

@Component({
	selector: "dialing-status",
	templateUrl: "./dialing-status.component.html",
	styleUrls: ["./dialing-status.component.scss"]
})
export class DialingStatusComponent {
	public status: GateStatus;

	@ViewChild("statusText") private statusText: ElementRef;

	constructor(private gateStatus: GateStatusService) {}

	ngOnInit() {
		this.gateStatus.subscribe(status => {
			this.status = status;
			this.updateAnimation(status);
		});
	}

	private flashNormal(): TweenMax {
		return TweenMax.fromTo(this.statusText.nativeElement, 1, { opacity: 0 }, { opacity: 1 })
			.repeat(-1)
			.yoyo(true);
	}

	private flashOnce(): TweenMax {
		return TweenMax.fromTo(this.statusText.nativeElement, 1, { opacity: 0 }, { opacity: 1 })
			.repeat(1)
			.repeatDelay(3)
			.yoyo(true);
	}

	private flashWarning(): TweenMax {
		TweenMax.set(this.statusText.nativeElement, { css: { className: "+=warning" } });
		return TweenMax.fromTo(this.statusText.nativeElement, 1, { opacity: 0 }, { opacity: 1 })
			.repeat(-1)
			.yoyo(true);
	}

	private hide(): void {
		TweenMax.set(this.statusText.nativeElement, { opacity: 0 });
	}

	private killAnimation(): void {
		TweenMax.killTweensOf(this.statusText.nativeElement);
	}

	private updateAnimation(status: GateStatus): void {
		this.killAnimation();
		switch (status) {
			case GateStatus.Idle:
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
