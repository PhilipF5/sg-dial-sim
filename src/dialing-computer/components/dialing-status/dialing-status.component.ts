import { Component, ElementRef, Input, SimpleChanges, ViewChild } from "@angular/core";

import { TimelineLite, TweenMax } from "gsap";

@Component({
	selector: "dialing-status",
	templateUrl: "./dialing-status.component.html",
	styleUrls: ["./dialing-status.component.scss"]
})
export class DialingStatusComponent {
	@Input()
	public status: string;

	@ViewChild("statusText")
	private statusText: ElementRef;

	ngOnChanges(changes: SimpleChanges) {
		if (changes.status && changes.status.previousValue !== changes.status.currentValue) {
			this.killAnimation();
			switch (this.status) {
				case "IDLE":
				case "ACTIVE":
					this.flashNormal();
					break;
				case "ENGAGED":
					this.flashOnce();
					break;
				case "DIALING":
					this.hide();
					break;
			}
		}
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
}
