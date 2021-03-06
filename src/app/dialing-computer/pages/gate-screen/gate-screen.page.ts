import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { abortDialing, beginDialing, shutdownGate } from "app/dialing-computer/actions";
import { KeyboardComponent } from "app/dialing-computer/components";
import { getDestination, getGateStatus } from "app/dialing-computer/selectors";
import { GateComponent } from "app/shared/components";
import { GateStatus, Glyph } from "app/shared/models";
import { ElectronService } from "app/shared/services";
import { gsap } from "gsap";
import { BehaviorSubject, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

@Component({
	selector: "sg-gate-screen",
	templateUrl: "./gate-screen.page.html",
	styleUrls: ["./gate-screen.page.scss"],
})
export class GateScreenPage implements OnDestroy, OnInit {
	@ViewChild(GateComponent, { static: true }) private gate: GateComponent;
	@ViewChild(KeyboardComponent, { static: true }) private keyboard: KeyboardComponent;

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
		return this.electron.ngxElectron.remote.BrowserWindow.getFocusedWindow();
	}

	public get isElectronApp(): boolean {
		return this.electron.ngxElectron.isElectronApp;
	}

	constructor(
		private electron: ElectronService,
		private route: ActivatedRoute,
		private router: Router,
		private store$: Store<any>,
	) {}

	ngOnDestroy() {
		this.killSubscriptions.next();
	}

	ngOnInit() {
		this.store$.pipe(select(getGateStatus), takeUntil(this.killSubscriptions)).subscribe((status) => {
			this.status = status;
			if (this.status === GateStatus.Idle) {
				this.destination = undefined;
			}
		});

		this.route.paramMap.pipe(take(1)).subscribe((params) => {
			if (params.has("dest")) {
				this.keyboard.loadAddressById(+params.get("dest"));
				this.openKeyboard();
			}
		});
	}

	public beginDialing(address: Glyph[]): void {
		this.updateGatePosition();
		this.store$.dispatch(beginDialing(address));
	}

	public closeKeyboard(): void {
		gsap.to(this.keyboard, { duration: 1, scale: 0 });
	}

	public goToAddressBook(): void {
		this.router.navigate(["/dialing-computer/address-book"], { skipLocationChange: true });
	}

	public keyboardStartDialingHandler(event: Glyph[]): void {
		this.beginDialing(event);
	}

	public openKeyboard(): void {
		gsap.to(this.keyboard.elem, { duration: 1, scale: 1 });
	}

	public quit(): void {
		this.electron.ngxElectron.remote.app.quit();
	}

	public shutdown(): void {
		this.store$.dispatch(this.status === GateStatus.Active ? shutdownGate() : abortDialing());
	}

	public toggleFullscreen(): void {
		this.electronWindow.setFullScreen(!this.electronWindow.isFullScreen());
	}

	private updateGatePosition(): void {
		this.gatePosition$.next(this.gate.elem.getBoundingClientRect() as DOMRect);
	}
}
