import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getGateStatus, getIrisStatus } from "app/dialing-computer/selectors";
import { GateStatus, IrisStatus } from "app/shared/models";
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

	public get fontSize(): string {
		if (this.status.length > 7) {
			return `${(5 * 9) / this.status.length}rem`;
		}
		return `5rem`;
	}

	public get status(): string {
		return this._status;
	}
	public set status(newStatus: string) {
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

	private _status: string;
	private _useFlashOnce: boolean;
	private _useFlashRepeat: boolean;
	private _useRedStyle: boolean;

	private killSubscriptions: Subject<{}> = new Subject();
	private gateStatus: GateStatus;
	private irisStatus: IrisStatus;

	private get statusText(): HTMLElement {
		return this._statusText.nativeElement;
	}

	constructor(private ngZone: NgZone, private store$: Store<any>) {}

	ngOnDestroy() {
		this.killSubscriptions.next();
	}

	ngOnInit() {
		this.store$.pipe(select(getGateStatus), takeUntil(this.killSubscriptions)).subscribe((status) => {
			this.status = this.gateStatus = status;
			this.updateAnimation(status);
		});

		this.store$.pipe(select(getIrisStatus), takeUntil(this.killSubscriptions)).subscribe((status) => {
			this.irisStatus = status;
			switch (status) {
				case IrisStatus.Open:
					this.status = this.gateStatus;
					break;
				case IrisStatus.Closed:
					this.status = "IRIS CLOSED";
					break;
			}
			this.updateAnimation(status);
		});
	}

	private killAnimation(): void {
		gsap.killTweensOf(this.statusText);
	}

	private updateAnimation(status: string): void {
		this.killAnimation();
		switch (status) {
			case GateStatus.Idle:
			case IrisStatus.Closed:
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
