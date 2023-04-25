import { AfterViewInit, Component, ElementRef, Input } from "@angular/core";
import { gsap } from "gsap";

@Component({
	selector: "sg-alert",
	templateUrl: "./alert.component.html",
	styleUrls: ["./alert.component.scss"],
})
export class AlertComponent implements AfterViewInit {
	@Input() title: string;
	@Input() text1: string;
	@Input() text2: string;
	@Input() footer: string;

	private get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	constructor(private _elem: ElementRef) {}

	ngAfterViewInit() {
		gsap.from(this.elem, { duration: 0.75, scale: 0, transformOrigin: "center center", ease: "none" });
	}
}
