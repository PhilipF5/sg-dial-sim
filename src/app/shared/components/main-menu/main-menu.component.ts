import { Component, ElementRef, ViewChild } from "@angular/core";
import { gsap } from "gsap";

@Component({
	selector: "sg-main-menu",
	templateUrl: "./main-menu.component.html",
	styleUrls: ["./main-menu.component.scss"],
})
export class MainMenuComponent {
	@ViewChild("dialog", { static: true }) private _dialog: ElementRef;

	public get dialog(): HTMLElement {
		return this._dialog.nativeElement;
	}

	public get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	public items: FunctionItem[] = [
		{ name: "Gate Status", path: "/dialing-computer/gate-screen" },
		{ name: "Address Database", path: "/dialing-computer/address-book" },
		{ name: "Symbol Selection", path: "/dialing-computer/glyph-selection" },
	];

	public selectedItem: number = 0;

	constructor(private _elem: ElementRef) {}

	public close(): void {
		gsap.to(this.dialog, { duration: 0.75, scale: 0, ease: "none" });
	}

	public open(): void {
		gsap.to(this.dialog, { duration: 0.75, scale: 1, ease: "none" });
	}
}

interface FunctionItem {
	name: string;
	path: string;
}
