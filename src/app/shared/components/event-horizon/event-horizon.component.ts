import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { gateClosed } from "app/dialing-computer/actions";
import { getGateStatus } from "app/dialing-computer/selectors";
import { GateStatus } from "app/shared/models";
import { AudioService } from "app/shared/services";
import { gsap } from "gsap";
import { clamp, random } from "lodash-es";
import { Application, Assets, BlurFilter, Resource, Sprite, Texture } from "pixi.js";
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
	private texture: Texture<Resource>;
	private readonly tints = [0xbbbbbb, 0xffffff, 0x95a5ab, 0x749efd, 0x99bdf9];

	public animationIdle: boolean;

	private get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	constructor(private audio: AudioService, private _elem: ElementRef, private store$: Store<any>) {}

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
		this.texture ??= await Assets.load("assets/images/event-horizon.svg");

		this.activeAnimationTimer = setInterval(() => {
			for (let i = 0; i < 4; i++) {
				this.animateParticle();
			}
		}, 10);
	}

	private animateParticle(): void {
		const eventHorizonParticle = new Sprite(this.texture);
		eventHorizonParticle.alpha = 0.25;
		eventHorizonParticle.anchor.x = 0.5;
		eventHorizonParticle.anchor.y = 0.5;
		eventHorizonParticle.scale.x = 0.2;
		eventHorizonParticle.scale.y = 0.2;
		eventHorizonParticle.tint = this.tints[random(0, 4)];
		eventHorizonParticle.x = this.eventHorizon.renderer.width / 2;
		eventHorizonParticle.y = this.eventHorizon.renderer.height / 2;

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
			const distanceFromOrigin = Math.sqrt(
				Math.pow(eventHorizonParticle.position.x - originalX, 2) +
					Math.pow(eventHorizonParticle.position.y - originalY, 2),
			);
			const clampedSpeedFactor = clamp(speedFactor, 0.25, 0.5);

			const xChange = Math.cos(vector) * clampedSpeedFactor;
			const yChange = Math.sin(vector) * clampedSpeedFactor;

			speedFactor += 0.001;

			eventHorizonParticle.position.x += xChange;
			eventHorizonParticle.position.y += yChange;

			if (distanceFromOrigin > (eventHorizonParticle.tint == 0xffffff ? 100 : 150)) {
				eventHorizonParticle.alpha -= 0.0025;
			}
			if (eventHorizonParticle.alpha < 0) {
				this.eventHorizon.stage.removeChild(eventHorizonParticle);
			}
		});
	}

	private createEventHorizon(): void {
		this.eventHorizon = new Application<HTMLCanvasElement>({ resizeTo: this.elem, backgroundAlpha: 0 });
		this.eventHorizon.stage.filters = [new BlurFilter(1)];
		this.eventHorizon.view.style.position = "absolute";
		this.eventHorizon.view.style.bottom = "0";
		this.eventHorizon.view.style.left = "0";
		this.eventHorizon.view.style.right = "0";
		this.eventHorizon.view.style.top = "0";
		this.elem.appendChild(this.eventHorizon.view);
	}

	private stopEventHorizon(): void {
		clearInterval(this.activeAnimationTimer);
		const clearFn = () => {
			this.eventHorizon.stage.children.forEach((particle) => (particle.alpha -= 0.0005));

			if (this.eventHorizon.stage.children.length === 0) {
				this.eventHorizon.ticker.remove(clearFn);
			}
		};

		this.eventHorizon.ticker.add(clearFn);
	}
}
