import { Component, HostBinding, Input, OnInit } from "@angular/core";

@Component({
	selector: "sg-light-bar",
	templateUrl: "./light-bar.component.html",
	styleUrls: ["./light-bar.component.scss"],
})
export class LightBarComponent implements OnInit {
	@Input() size: number = 1;
	@HostBinding("class.reversed") @Input() reversed: boolean;
	@HostBinding("class.vertical") @Input() vertical: boolean;

	public iterator: number[];

	ngOnInit() {
		this.iterator = Array.from({ length: this.size }, (_, index) => index);
	}
}
