import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getGateStatus } from "app/dialing-computer/selectors";
import { GateStatus } from "app/shared/models";
import { gsap } from "gsap";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "sg-dialing-status",
	templateUrl: "./dialing-status.component.html",
	styleUrls: ["./dialing-status.component.scss"],
})
export class DialingStatusComponent implements OnDestroy, OnInit {
	@ViewChild("statusText", { static: true }) private _statusText: ElementRef;

	public get status(): GateStatus {
		return this._status;
	}
	public set status(newStatus: GateStatus) {
		this.ngZone.run(() => (this._status = newStatus));
	}

	public get useFlashOnce(): boolean {
		return this._useFlashOnce;
	}
	public set useFlashOnce(use: boolean) {
		this.ngZone.run(() => (this._useFlashOnce = use));
	}

	public get useFlashRepeat(): boolean {
		return this._useFlashRepeat;
	}
	public set useFlashRepeat(use: boolean) {
		this.ngZone.run(() => (this._useFlashRepeat = use));
	}

	public get useRedStyle(): boolean {
		return this._useRedStyle;
	}
	public set useRedStyle(use: boolean) {
		this.ngZone.run(() => (this._useRedStyle = use));
	}

	private _status: GateStatus;
	private _useFlashOnce: boolean;
	private _useFlashRepeat: boolean;
	private _useRedStyle: boolean;

	private killSubscriptions: Subject<{}> = new Subject();

	private get statusText(): HTMLElement {
		return this._statusText.nativeElement;
	}

	constructor(private ngZone: NgZone, private store$: Store<any>) {}

	ngOnDestroy() {
		this.killSubscriptions.next();
	}

	ngOnInit() {
		this.store$.pipe(select(getGateStatus), takeUntil(this.killSubscriptions)).subscribe((status) => {
			this.status = status;
			this.updateAnimation(status);
		});
	}

	private killAnimation(): void {
		gsap.killTweensOf(this.statusText);
	}

	private updateAnimation(status: GateStatus): void {
		this.killAnimation();
		switch (status) {
			case GateStatus.Idle:
				this.useRedStyle = true;
				this.useFlashRepeat = true;
				this.useFlashOnce = false;
				break;
			case GateStatus.Engaged:
			case GateStatus.Shutdown:
			case GateStatus.Aborted:
				this.useRedStyle = false;
				this.useFlashRepeat = false;
				this.useFlashOnce = true;
				break;
			case GateStatus.Dialing:
				this.useFlashOnce = this.useFlashRepeat = false;
				break;
			case GateStatus.Active:
				this.useFlashRepeat = true;
				break;
		}
	}
}
