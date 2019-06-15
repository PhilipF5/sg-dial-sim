import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getGateStatus } from "app/dialing-computer/selectors";
import { GateStatus } from "app/shared/models";
import { TweenMax } from "gsap";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "sg-dialing-status",
	templateUrl: "./dialing-status.component.html",
	styleUrls: ["./dialing-status.component.scss"],
})
export class DialingStatusComponent implements OnDestroy, OnInit {
	@ViewChild("statusText", { static: true }) private _statusText: ElementRef;

	public status: GateStatus;

	private killSubscriptions: Subject<{}> = new Subject();

	private get statusText(): HTMLElement {
		return this._statusText.nativeElement;
	}

	constructor(private store$: Store<any>) {}

	ngOnDestroy() {
		this.killSubscriptions.next();
	}

	ngOnInit() {
		this.store$
			.pipe(
				select(getGateStatus),
				takeUntil(this.killSubscriptions)
			)
			.subscribe(status => {
				this.status = status;
				this.updateAnimation(status);
			});
	}

	private flashNormal(): TweenMax {
		TweenMax.set(this.statusText, { css: { className: "-=red" } });
		return TweenMax.fromTo(this.statusText, 0.5, { opacity: 0 }, { opacity: 0.8 })
			.repeat(-1)
			.yoyo(true);
	}

	private flashOnce(): TweenMax {
		TweenMax.set(this.statusText, { css: { className: "-=red" } });
		return TweenMax.fromTo(this.statusText, 1, { opacity: 0 }, { opacity: 0.8 })
			.repeat(1)
			.repeatDelay(2)
			.yoyo(true);
	}

	private flashRed(): TweenMax {
		TweenMax.set(this.statusText, { css: { className: "+=red" } });
		return TweenMax.fromTo(this.statusText, 0.5, { opacity: 0 }, { opacity: 0.6 })
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
				this.flashRed();
				break;
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
