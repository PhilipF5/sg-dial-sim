import { Component, ElementRef, Input, SimpleChanges, ViewChild } from "@angular/core";

import { Elastic, Power1, Power4, TimelineLite, TweenMax } from "gsap";

import { GateStatus } from "shared/models";
import { GateStatusService } from "shared/services";

@Component({
	selector: "gate",
	templateUrl: "./gate.component.html",
	styleUrls: ["./gate.component.scss"]
})
export class GateComponent {
	constructor(private gateStatus: GateStatusService) {}

	ngOnInit() {
		this.gateStatus.subscribe(status => {});
	}
}
