import { AfterContentChecked, Component, ContentChildren, Input, QueryList, ViewChild } from "@angular/core";

import { TweenMax } from "gsap";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { MenuComponent } from "../menu/menu.component";
import { SgButtonComponent } from "../sg-button/sg-button.component";

@Component({
	selector: "menu-button",
	templateUrl: "./menu-button.component.html",
	styleUrls: ["./menu-button.component.scss"]
})
export class MenuButtonComponent implements AfterContentChecked {
	@ContentChildren(SgButtonComponent, { descendants: true }) buttons: QueryList<SgButtonComponent>;

	@Input() position: string;
	@Input() text: string;

	@ViewChild(MenuComponent) menu: MenuComponent;

	public isMenuOpen: boolean;

	private killSubscriptions = new Subject();

	ngAfterContentChecked() {
		this.killSubscriptions.next();
		this.buttons.forEach(btn => {
			btn.sgClick.pipe(takeUntil(this.killSubscriptions)).subscribe(() => this.toggleMenu());
		});
	}

	public toggleMenu(): void {
		this.isMenuOpen = !this.isMenuOpen;
		TweenMax.to(this.menu.elem, 1, { scale: +this.isMenuOpen });
	}
}
