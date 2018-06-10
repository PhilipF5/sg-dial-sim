import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { TweenMax } from "gsap";

import { GateStatus } from "shared/models";
import { GateStatusService } from "shared/services";

@Component({
	selector: "dialing-status",
	templateUrl: "./dialing-status.component.html",
	styleUrls: ["./dialing-status.component.scss"],
})
export class DialingStatusComponent implements OnInit {
	public status: GateStatus;

	@ViewChild("statusText") private _statusText: ElementRef;

	private get statusText(): HTMLElement {
		return this._statusText.nativeElement;
	}

	constructor(private gateStatus: GateStatusService) {}

	ngOnInit() {
		this.gateStatus.subscribe(status => {
			this.status = status;
			this.updateAnimation(status);
		});
	}

	private flashNormal(): TweenMax {
		return TweenMax.fromTo(this.statusText, 1, { opacity: 0 }, { opacity: 1 })
			.repeat(-1)
			.yoyo(true);
	}

	private flashOnce(): TweenMax {
		return TweenMax.fromTo(this.statusText, 1, { opacity: 0 }, { opacity: 1 })
			.repeat(1)
			.repeatDelay(3)
			.yoyo(true);
	}

	private flashWarning(): TweenMax {
		TweenMax.set(this.statusText, { css: { className: "+=warning" } });
		return TweenMax.fromTo(this.statusText, 1, { opacity: 0 }, { opacity: 1 })
			.repeat(-1)
			.yoyo(true);
	}

	private hide(): void {
		TweenMax.set(this.statusText, { opacity: 0 });
	}

	private killAnimation(): void {
		TweenMax.killTweensOf(this.statusText);
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
