import {
	AfterViewInit,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren,
} from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { chevronEngaged, engageChevron, failChevron, glyphReady, reset, spinRing } from "app/dialing-computer/actions";
import { ChevronActivation } from "app/dialing-computer/models";
import { getGateStatus } from "app/dialing-computer/selectors";
import { GateAnimations } from "app/shared/animations";
import { ChevronDirective } from "app/shared/directives";
import { GateStatus, Sound } from "app/shared/models";
import { AudioService } from "app/shared/services";
import { gsap } from "gsap";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "sg-gate",
	templateUrl: "./gate.component.html",
	styleUrls: ["./gate.component.scss"],
})
export class GateComponent implements AfterViewInit, OnDestroy, OnInit {
	@ViewChildren(ChevronDirective) private chevrons: QueryList<ChevronDirective>;
	@ViewChild("ring", { static: true }) private ring: ElementRef;

	private animation: gsap.core.Timeline;
	private killSubscriptions: Subject<{}> = new Subject();
	private ringPosition: number = 1;
	private statusUpdateCount: number = 0;

	public get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	constructor(
		private actions$: Actions,
		private audio: AudioService,
		private _elem: ElementRef,
		private store$: Store<any>,
	) {}

	ngAfterViewInit() {
		this.store$.pipe(select(getGateStatus), takeUntil(this.killSubscriptions)).subscribe((status) => {
			switch (status) {
				case GateStatus.Aborted:
					this.killAnimations();
					this.audio.failRing().onended = () => this.store$.dispatch(reset());
					break;
				case GateStatus.Idle:
					this.resetRing();
					if (this.statusUpdateCount > 0) {
						this.audio.play(Sound.ChevronLock);
					}
					for (let chevron of this.chevrons.filter((c) => c.enabled)) {
						this.disengageChevron(chevron.chevron);
					}
					break;
			}

			this.statusUpdateCount++;
		});
	}

	ngOnDestroy() {
		this.killSubscriptions.next();
	}

	ngOnInit() {
		this.actions$
			.pipe(ofType(engageChevron, failChevron), takeUntil(this.killSubscriptions))
			.subscribe(({ chevron, type }) => {
				let engage = type === engageChevron.type;
				if (engage) {
					this.engageChevron(chevron).add(() => this.store$.dispatch(chevronEngaged(chevron)));
				} else {
					this.engageChevron(chevron, false);
				}
			});

		this.actions$
			.pipe(ofType(spinRing), takeUntil(this.killSubscriptions))
			.subscribe(({ chevron, glyph }) =>
				this.spinTo({ chevron, glyph }).add(() => this.store$.dispatch(glyphReady(chevron, glyph))),
			);
	}

	public chevron(index: number): ChevronDirective {
		return this.chevrons.find((c) => c.chevron === index);
	}

	private disengageChevron(chevron: number): gsap.core.Timeline {
		return this.chevron(chevron).inactivate();
	}

	private engageChevron(chevron: number, succeed: boolean = true): gsap.core.Timeline {
		let timeline = gsap.timeline().add(this.chevron(7).lock(succeed, chevron === 7), "+=1");

		if (succeed) {
			timeline.add(this.chevron(chevron).activate(), "-=1");
		}

		return (this.animation = timeline);
	}

	private killAnimations(): void {
		if (!!this.animation) {
			this.animation.kill();
			this.animation = undefined;
		}
	}

	private resetRing(): gsap.core.Tween {
		this.ringPosition = 1;
		return gsap.set(this.ring.nativeElement, { rotation: 0 });
	}

	private spinTo(activation: ChevronActivation): gsap.core.Timeline {
		let startPosition = this.ringPosition;
		this.ringPosition = activation.glyph.position;
		let degreesPerPosition = 9.2307;
		let positionsToRotate: number;
		let degreesToRotate: string;
		let direction: string;

		if (activation.chevron % 2 === 0) {
			direction = "-=";
			if (activation.glyph.position > startPosition) {
				positionsToRotate = activation.glyph.position - startPosition - 1;
			} else if (activation.glyph.position < startPosition) {
				positionsToRotate = 39 - startPosition + activation.glyph.position;
			}
		} else {
			direction = "+=";
			if (activation.glyph.position > startPosition) {
				positionsToRotate = startPosition + 39 - activation.glyph.position;
			} else if (activation.glyph.position < startPosition) {
				positionsToRotate = startPosition - activation.glyph.position - 1;
			}
		}

		degreesToRotate = direction + degreesPerPosition * positionsToRotate;
		return (this.animation = GateAnimations.spinRing(this.ring, positionsToRotate / 2.5, degreesToRotate)
			.add(() => this.audio.startRing(), 0)
			.add(() => this.audio.stopRing()));
	}
}
