import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { closeIris, irisClosed, irisOpened, openIris } from "app/dialing-computer/actions";
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
		return this.createTimeline()
			.reverse()
			.add(() => this.ngZone.run(() => this.store$.dispatch(irisClosed())));
	}

	public open(): gsap.core.Timeline {
		return this.createTimeline().add(() => this.ngZone.run(() => this.store$.dispatch(irisOpened())));
	}

	private createTimeline(): gsap.core.Timeline {
		return gsap.timeline().fromTo(
			this,
			{ rotation: 0 },
			{
				rotation: -62,
				duration: 4,
				ease: CustomEase.create(
					"custom",
					"M0,0,C0,0,0.066,0.114,0.132,0.124,0.69,0.206,0.332,0.866,0.9,0.936,0.965,0.944,1,1,1,1",
				),
			},
		);
	}
}
