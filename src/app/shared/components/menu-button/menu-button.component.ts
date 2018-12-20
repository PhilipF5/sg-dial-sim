import { Component, HostListener, Input, ViewChild } from "@angular/core";
import { TweenMax } from "gsap";

import { MenuComponent } from "../menu/menu.component";

@Component({
	selector: "menu-button",
	templateUrl: "./menu-button.component.html",
	styleUrls: ["./menu-button.component.scss"]
})
export class MenuButtonComponent {
	@Input() position: string;
	@Input() text: string;

	@ViewChild(MenuComponent) menu: MenuComponent;

	public isMenuOpen: boolean;

	@HostListener("click")
	public toggleMenu(): void {
		this.isMenuOpen = !this.isMenuOpen;
		TweenMax.to(this.menu.elem, 1, { scale: +this.isMenuOpen });
	}
}
