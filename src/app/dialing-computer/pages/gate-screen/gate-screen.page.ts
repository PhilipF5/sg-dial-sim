import { AfterViewInit, Component, HostListener, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { abortDialing, beginDialing, closeIris, openIris, shutdownGate } from "app/dialing-computer/actions";
import { KeyboardComponent } from "app/dialing-computer/components";
import { getDestination, getGateStatus, getIrisStatus, getUser } from "app/dialing-computer/selectors";
import { GateComponent, MainMenuComponent } from "app/shared/components";
import { GateStatus, Glyph, Glyphs, IrisStatus } from "app/shared/models";
import { AlertService, ElectronService } from "app/shared/services";
import { gsap } from "gsap";
import { BehaviorSubject, Subject } from "rxjs";
import { take, takeUntil } from "rxjs/operators";

@Component({
	selector: "sg-gate-screen",
	templateUrl: "./gate-screen.page.html",
	styleUrls: ["./gate-screen.page.scss"],
})
export class GateScreenPage implements AfterViewInit, OnDestroy, OnInit {
	@ViewChild(GateComponent, { static: true }) private gate: GateComponent;
	@ViewChild(KeyboardComponent, { static: true }) private keyboard: KeyboardComponent;
	@ViewChild(MainMenuComponent, { static: true }) private mainMenu: MainMenuComponent;

	public authCode: string;
	public destination: string;
	public destination$ = this.store$.pipe(select(getDestination));
	public gatePosition$: BehaviorSubject<DOMRect> = new BehaviorSubject(null);
	public irisStatus: IrisStatus;
	public status: GateStatus;
	public user: string;

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

	public get isElectronApp(): boolean {
		return this.electron.isElectronApp;
	}

	constructor(
		private alert: AlertService,
		private electron: ElectronService,
		private route: ActivatedRoute,
		private router: Router,
		private store$: Store<any>,
	) {}

	ngAfterViewInit() {
		this.route.paramMap.pipe(take(1)).subscribe((params) => {
			if (params.has("dest")) {
				const address = Array.from(params.get("dest")).map((char) =>
					Glyphs.standard.find((g) => g.char === char),
				);
				this.beginDialing(address);
			}
		});
	}

	ngOnDestroy() {
		this.killSubscriptions.next({});
	}

	ngOnInit() {
		this.store$.pipe(select(getGateStatus), takeUntil(this.killSubscriptions)).subscribe((status) => {
			this.status = status;
			if (this.status === GateStatus.Idle) {
				this.destination = undefined;
			}
		});

		this.store$.pipe(select(getIrisStatus), takeUntil(this.killSubscriptions)).subscribe((status) => {
			this.irisStatus = status;
		});

		this.store$
			.pipe(select(getUser), takeUntil(this.killSubscriptions))
			.subscribe(({ authCode, fullName, userId }) => {
				this.authCode = authCode;
				this.user = `${fullName} ${userId}`;
			});
	}

	public beginDialing(address: Glyph[]): void {
		this.updateGatePosition();
		this.store$.dispatch(beginDialing(address));
	}

	public closeKeyboard(): void {
		gsap.to(this.keyboard, { duration: 1, scale: 0 });
	}

	public keyboardStartDialingHandler(event: Glyph[]): void {
		this.beginDialing(event);
	}

	public openKeyboard(): void {
		gsap.to(this.keyboard.elem, { duration: 1, scale: 1 });
	}

	@HostListener("window:keydown.space")
	public openMainMenu(): void {
		this.mainMenu.open();
	}

	public quit(): void {
		this.electron.quit();
	}

	@HostListener("window:keydown.arrowdown")
	public shutdown(): void {
		if (this.canShutdown) {
			this.store$.dispatch(this.status === GateStatus.Active ? shutdownGate() : abortDialing());
		}
	}

	public toggleFullscreen(): void {
		this.electron.toggleFullScreen();
	}

	@HostListener("window:keydown.arrowright")
	public toggleIris(): void {
		if (this.irisStatus === IrisStatus.Open) {
			this.store$.dispatch(closeIris());
		} else if (this.irisStatus === IrisStatus.Closed) {
			this.store$.dispatch(openIris());
		}
	}

	@HostListener("window:keydown.h")
	public triggerAlert(): void {
		this.alert.alerts.next({
			duration: 4000,
			title: "Unknown Error",
			text1: "Encoding Error - 9910127",
			text2: "Error Unknown",
			footer: "Initialization Error - 84710",
		});
	}

	private updateGatePosition(): void {
		this.gatePosition$.next(this.gate.elem.getBoundingClientRect() as DOMRect);
	}
}
