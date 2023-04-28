import { Component, ElementRef } from "@angular/core";

@Component({
	selector: "sg-scroll-bar",
	templateUrl: "./scroll-bar.component.html",
	styleUrls: ["./scroll-bar.component.scss"],
})
export class ScrollBarComponent {
	public get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	constructor(private _elem: ElementRef) {}
}
