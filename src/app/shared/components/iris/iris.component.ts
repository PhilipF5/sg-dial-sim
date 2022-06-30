import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { closeIris, irisClosed, irisOpened, openIris } from "app/dialing-computer/actions";
import { Sound } from "app/shared/models";
import { AudioService } from "app/shared/services";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "sg-iris",
	templateUrl: "./iris.component.html",
	styleUrls: ["./iris.component.scss"],
})
export class IrisComponent implements AfterViewInit, OnDestroy, OnInit {
	public rotation: number = 0;

	private killSubscriptions: Subject<{}> = new Subject();

	constructor(
		private actions$: Actions,
		private audio: AudioService,
		private ngZone: NgZone,
		private store$: Store<any>,
	) {}

	ngAfterViewInit(): void {}

	ngOnDestroy(): void {
		this.killSubscriptions.next();
	}

	ngOnInit(): void {
		this.actions$.pipe(ofType(openIris), takeUntil(this.killSubscriptions)).subscribe(() => this.open());

		this.actions$.pipe(ofType(closeIris), takeUntil(this.killSubscriptions)).subscribe(() => this.close());
	}

	public close(): gsap.core.Timeline {
		return gsap
			.timeline()
			.fromTo(
				this,
				{ rotation: 0 },
				{
					rotation: -65,
					duration: 3,
					ease: "iris",
				},
			)
			.add(() => this.ngZone.run(() => this.store$.dispatch(irisClosed())))
			.add(() => this.audio.play(Sound.IrisClose), 0);
	}

	public open(): gsap.core.Timeline {
		function invertEase(ease) {
			if (typeof ease === "string") {
				ease = CustomEase.get(ease);
			}
			return function (p) {
				return 1 - ease(1 - p);
			};
		}

		return gsap
			.timeline()
			.fromTo(
				this,
				{ rotation: -65 },
				{
					rotation: 0,
					duration: 3,
					ease: invertEase("iris"),
				},
			)
			.add(() => this.ngZone.run(() => this.store$.dispatch(irisOpened())))
			.add(() => this.audio.play(Sound.IrisOpen), 0);
	}
}
