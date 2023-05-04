import { AfterViewInit, Component, ElementRef, HostBinding, NgZone, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { gateClosed } from "app/dialing-computer/actions";
import { getGateStatus } from "app/dialing-computer/selectors";
import { EventHorizonAnimations } from "app/shared/animations";
import { GateStatus } from "app/shared/models";
import { AudioService } from "app/shared/services";
import { gsap } from "gsap";
import { clamp, random } from "lodash-es";
import { Application, Assets, BlurFilter, Sprite } from "pixi.js";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";

@Component({
	selector: "sg-event-horizon",
	templateUrl: "./event-horizon.component.html",
	styleUrls: ["./event-horizon.component.scss"],
})
export class EventHorizonComponent implements AfterViewInit, OnDestroy, OnInit {
	private activeAnimationTimer: ReturnType<typeof setInterval>;
	private eventHorizon: Application<HTMLCanvasElement>;
	private readonly ignoredStatuses = [GateStatus.Dialing, GateStatus.Engaged];
	private killSubscriptions: Subject<{}> = new Subject();

	@HostBinding("class.active")
	public active: boolean;

	@HostBinding("class.anim-idle")
	public animationIdle: boolean;

	@HostBinding("class.anim-active")
	public animationActive: boolean;

	private get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	constructor(
		private audio: AudioService,
		private _elem: ElementRef,
		private ngZone: NgZone,
		private store$: Store<any>,
	) {}

	ngAfterViewInit(): void {
		this.createEventHorizon();
	}

	ngOnDestroy() {
		this.killSubscriptions.next({});
	}

	ngOnInit() {
		this.store$
			.pipe(
				select(getGateStatus),
				filter((s) => !this.ignoredStatuses.includes(s)),
				takeUntil(this.killSubscriptions),
			)
			.subscribe((status) => this.setAnimation(status));
	}

	private setAnimation(status: GateStatus): void {
		gsap.killTweensOf(this.elem);
		switch (status) {
			case GateStatus.Idle:
				this.animationIdle = true;
				break;
			case GateStatus.Active:
				this.animationIdle = false;
				this.animateEventHorizon();
				this.audio.startEventHorizon();
				break;
			case GateStatus.Shutdown:
				this.stopEventHorizon();
				this.audio.stopEventHorizon();
				setTimeout(() => this.store$.dispatch(gateClosed()), 4000);
				break;
		}
	}

	private async animateEventHorizon(): Promise<void> {
		const texture = await Assets.load("assets/images/event-horizon.svg");

		this.activeAnimationTimer = setInterval(() => {
			animateParticle();
			animateParticle();
			animateParticle();
			animateParticle();
		}, 10);

		const tints = [0xbbbbbb, 0xffffff, 0x95a5ab, 0x749efd, 0x99bdf9];

		const animateParticle = () => {
			// This creates a texture
			const eventHorizonParticle = new Sprite(texture);
			eventHorizonParticle.tint = tints[random(0, 4)];
			eventHorizonParticle.scale.x = 0.2;
			eventHorizonParticle.scale.y = 0.2;
			eventHorizonParticle.x = this.eventHorizon.renderer.width / 2;
			eventHorizonParticle.y = this.eventHorizon.renderer.height / 2;
			eventHorizonParticle.anchor.x = 0.5;
			eventHorizonParticle.anchor.y = 0.5;
			eventHorizonParticle.alpha = 0.25;
			const vector = random(0, 359);
			let speedFactor = 0.25;
			if (eventHorizonParticle.tint == 0xffffff) {
				this.eventHorizon.stage.addChild(eventHorizonParticle);
			} else {
				this.eventHorizon.stage.addChildAt(eventHorizonParticle, 0);
			}

			const originalX = eventHorizonParticle.position.x;
			const originalY = eventHorizonParticle.position.y;
			this.eventHorizon.ticker.add(() => {
				const totalChangeX = Math.abs(originalX - eventHorizonParticle.position.x);
				const totalChangeY = Math.abs(originalY - eventHorizonParticle.position.y);

				const xChange = Math.cos(vector) * clamp(speedFactor, 0.25, 0.5);
				const yChange = Math.sin(vector) * clamp(speedFactor, 0.25, 0.5);

				speedFactor += 0.001;

				eventHorizonParticle.position.x += xChange;
				eventHorizonParticle.position.y += yChange;

				if (eventHorizonParticle.tint == 0xffffff && Math.max(totalChangeX, totalChangeY) > 100) {
					eventHorizonParticle.alpha -= 0.0025;
				}
				if (Math.max(totalChangeX, totalChangeY) > 150) {
					eventHorizonParticle.alpha -= 0.0025;
				}
				if (eventHorizonParticle.alpha < 0) {
					this.eventHorizon.stage.removeChild(eventHorizonParticle);
				}
			});
		};
	}

	private createEventHorizon(): void {
		// The application will create a canvas element for you that you
		// can then insert into the DOM
		this.eventHorizon = new Application<HTMLCanvasElement>({ resizeTo: this.elem, backgroundAlpha: 0 });
		this.eventHorizon.renderer.background;
		this.eventHorizon.view.style.position = "absolute";
		this.eventHorizon.view.style.top = "0";
		this.eventHorizon.view.style.left = "0";
		this.eventHorizon.view.style.bottom = "0";
		this.eventHorizon.view.style.right = "0";
		this.elem.appendChild(this.eventHorizon.view);

		const blurFilter = new BlurFilter(1);
		this.eventHorizon.stage.filters = [blurFilter];

		// load the texture we need
	}

	private stopEventHorizon(): void {
		clearInterval(this.activeAnimationTimer);
		let clearFn;
		this.eventHorizon.ticker.add(
			(clearFn = () => {
				this.eventHorizon.stage.children.forEach((particle) => (particle.alpha -= 0.0005));

				if (this.eventHorizon.stage.children.length === 0) {
					this.eventHorizon.ticker.remove(clearFn);
				}
			}),
		);
	}
}
