import { Component, Input } from "@angular/core";

@Component({
	selector: "menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.scss"]
})
export class MenuComponent {
	@Input() buttons: any[];
}
