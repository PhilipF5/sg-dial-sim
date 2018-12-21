import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { TweenMax } from "gsap";
import { BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";

import { KeyboardComponent } from "app/dialing-computer/components";
import { GateControlService } from "app/dialing-computer/services";
import { GateComponent } from "app/shared/components";
import { GateStatus, Glyph, Glyphs } from "app/shared/models";
import { GateStatusService } from "app/shared/services";

@Component({
	selector: "gate-screen",
	templateUrl: "./gate-screen.page.html",
	styleUrls: ["./gate-screen.page.scss"],
})
export class GateScreenPage implements OnInit {
	@ViewChild(GateComponent) private gate: GateComponent;
	@ViewChild(KeyboardComponent) private keyboard: KeyboardComponent;

	public authCode: string = "10183523652-4354393";
	public destination: string;
	public gatePosition$: BehaviorSubject<DOMRect> = new BehaviorSubject(null);
	public glyphs: Glyph[] = [];
	public status: GateStatus;
	public user: string = "W. Harriman";

	constructor(
		private gateControl: GateControlService,
		private gateStatus: GateStatusService,
		private route: ActivatedRoute,
		private router: Router,
	) {}

	ngOnInit() {
		this.gateControl.result$.subscribe(
			res => (this.destination = res.destination && res.destination.name.toUpperCase())
		);
		this.gateStatus.subscribe(status => {
			if (status === GateStatus.Idle) {
				this.destination = undefined;
			}
		});
		this.route.paramMap.pipe(take(1)).subscribe(params => {
			if (params.has("dest")) {
				this.keyboard.loadAddressById(+params.get("dest"));
				this.openKeyboard();
			}
		})
	}

	public beginDialing(address: Glyph[]): void {
		address.push(Glyphs.pointOfOrigin);
		this.glyphs = address;
		this.gateStatus.dialing();
		this.runDialingSequence();
	}

	public closeKeyboard(): void {
		TweenMax.to(this.keyboard, 1, { css: { className: "+=minimized" } });
	}

	public goToAddressBook(): void {
		this.router.navigate(["/dialing-computer/address-book"]);
	}

	public keyboardStartDialingHandler(event: Glyph[]): void {
		this.beginDialing(event);
	}

	public openKeyboard(): void {
		TweenMax.to(this.keyboard.elem, 1, { css: { className: "-=minimized" } });
	}

	public shutdown(): void {
		this.gateControl.shutdown();
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
