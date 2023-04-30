import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { gsap } from "gsap";

@Component({
	selector: "sg-main-menu",
	templateUrl: "./main-menu.component.html",
	styleUrls: ["./main-menu.component.scss"],
})
export class MainMenuComponent {
	public get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	public isOpen: boolean = false;

	public items: FunctionItem[] = [
		{ name: "Gate Status", path: "/dialing-computer/gate-screen" },
		{ name: "Address Database", path: "/dialing-computer/address-book" },
		{ name: "Symbol Selection", path: "/dialing-computer/glyph-selection" },
	];

	public selectedItem: number = 0;

	constructor(private _elem: ElementRef, private router: Router) {}

	@HostListener("window:keydown.esc")
	public close(): void {
		gsap.to(this.elem, { duration: 0.3, scale: 0, ease: "none" }).then(() => (this.isOpen = false));
	}

	public open(): void {
		this.isOpen = true;
		gsap.to(this.elem, { duration: 0.3, scale: 1, ease: "none" });
	}

	public onSelectionChange(selection: number) {
		this.selectedItem = selection;
	}

	@HostListener("window:keydown.enter")
	public navigate(): void {
		this.router.navigate([this.items[this.selectedItem].path], { skipLocationChange: true });
	}
}

interface FunctionItem {
	name: string;
	path: string;
}
