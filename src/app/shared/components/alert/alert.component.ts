import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { gsap } from "gsap";

@Component({
	selector: "sg-alert",
	templateUrl: "./alert.component.html",
	styleUrls: ["./alert.component.scss"],
})
export class AlertComponent implements AfterViewInit {
	@Input() critical: boolean;
	@Input() message: string;
	@Input() title: string;

	@ViewChild("messageElement", { static: true }) private _messageElement: ElementRef;

	private get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	private get messageElement(): HTMLElement {
		return this._messageElement.nativeElement;
	}

	constructor(private _elem: ElementRef) {}

	ngAfterViewInit() {
		gsap.from(this.elem, { duration: 2, scale: 0, transformOrigin: "center center", ease: "power1.out" });
		gsap.to(this.messageElement, { duration: 0.5, opacity: 0.5, repeat: -1, yoyo: true });
	}
}
