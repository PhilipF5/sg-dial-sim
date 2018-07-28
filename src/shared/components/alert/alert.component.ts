import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";

import { Power1, TweenMax } from "gsap";

@Component({
	selector: "alert",
	templateUrl: "./alert.component.html",
	styleUrls: ["./alert.component.scss"],
})
export class AlertComponent implements AfterViewInit {
	@Input() public critical: boolean;
	@Input() public message: string;
	@Input() public title: string;

	@ViewChild("messageElement") private _messageElement: ElementRef;

	private get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	private get messageElement(): HTMLElement {
		return this._messageElement.nativeElement;
	}

	constructor(private _elem: ElementRef) {}

	ngAfterViewInit() {
		TweenMax.from(this.elem, 2, { scale: 0, transformOrigin: "center center", ease: Power1.easeOut });
		TweenMax.to(this.messageElement, 0.5, { opacity: 0.5 })
			.repeat(-1)
			.yoyo(true);
	}
}
