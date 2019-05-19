import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { Store, select } from "@ngrx/store";
import { TweenMax } from "gsap";
import { ElectronService } from "ngx-electron";
import { BehaviorSubject, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

import { DialingComputerActions } from "app/dialing-computer/actions";
import { KeyboardComponent } from "app/dialing-computer/components";
import { GateControlService } from "app/dialing-computer/services";
import { getDestination, getGateStatus } from "app/dialing-computer/selectors";
import { GateComponent } from "app/shared/components";
import { GateStatus, Glyph, Glyphs } from "app/shared/models";
import { GateStatusService } from "app/shared/services";

@Component({
	selector: "gate-screen",
	templateUrl: "./gate-screen.page.html",
	styleUrls: ["./gate-screen.page.scss"],
})
export class GateScreenPage implements OnDestroy, OnInit {
	@ViewChild(GateComponent) private gate: GateComponent;
	@ViewChild(KeyboardComponent) private keyboard: KeyboardComponent;

	public authCode: string = "10183523652-4354393";
	public destination: string;
	public destination$ = this.store$.pipe(select(getDestination));
	public gatePosition$: BehaviorSubject<DOMRect> = new BehaviorSubject(null);
	public glyphs: Glyph[] = [];
	public status: GateStatus;
	public user: string = "W. Harriman";

	private killSubscriptions: Subject<{}> = new Subject();

	public get canOpenAddressBook(): boolean {
		return this.status === GateStatus.Idle;
	}

	public get canShutdown(): boolean {
		switch (this.status) {
			case GateStatus.Active:
			case GateStatus.Dialing:
				return true;
			default:
				return false;
		}
	}

	public get electronWindow(): import("electron").BrowserWindow {
		return this.electron.remote.BrowserWindow.getFocusedWindow();
	}

	public get isElectronApp(): boolean {
		return this.electron.isElectronApp;
	}

	constructor(
		private electron: ElectronService,
		private gateControl: GateControlService,
		private gateStatus: GateStatusService,
		private route: ActivatedRoute,
		private router: Router,
		private store$: Store<any>
	) {}

	ngOnDestroy() {
		this.killSubscriptions.next();
	}

	ngOnInit() {
		this.gateControl.result$
			.pipe(takeUntil(this.killSubscriptions))
			.subscribe(res => (this.destination = res.destination && res.destination.name.toUpperCase()));

		this.store$
			.pipe(
				select(getGateStatus),
				takeUntil(this.killSubscriptions)
			)
			.subscribe(status => {
				this.status = status;
				if (this.status === GateStatus.Idle) {
					this.destination = undefined;
				}
			});

		this.route.paramMap.pipe(take(1)).subscribe(params => {
			if (params.has("dest")) {
				this.keyboard.loadAddressById(+params.get("dest"));
				this.openKeyboard();
			}
		});
	}

	public beginDialing(address: Glyph[]): void {
		this.updateGatePosition();
		this.store$.dispatch(new DialingComputerActions.BeginDialing({ address }));
	}

	public closeKeyboard(): void {
		TweenMax.to(this.keyboard, 1, { css: { className: "+=minimized" } });
	}

	public goToAddressBook(): void {
		this.router.navigate(["/dialing-computer/address-book"], { skipLocationChange: true });
	}

	public keyboardStartDialingHandler(event: Glyph[]): void {
		this.beginDialing(event);
	}

	public openKeyboard(): void {
		TweenMax.to(this.keyboard.elem, 1, { css: { className: "-=minimized" } });
	}

	public quit(): void {
		this.electron.remote.app.quit();
	}

	public shutdown(): void {
		this.store$.dispatch(
			status === GateStatus.Active
				? new DialingComputerActions.ShutdownGate()
				: new DialingComputerActions.AbortDialing()
		);
	}

	public toggleFullscreen(): void {
		this.electronWindow.setFullScreen(!this.electronWindow.isFullScreen());
	}

	private runDialingSequence(): void {
		this.updateGatePosition();
		this.gateControl.loadAddress(this.glyphs);
		this.gateControl.dial();
	}

	private updateGatePosition(): void {
		this.gatePosition$.next(this.gate.elem.getBoundingClientRect() as DOMRect);
	}
}
