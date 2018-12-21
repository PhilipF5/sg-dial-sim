import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { TimelineLite, TweenLite } from "gsap";

import { Destination } from "app/shared/models";
import { GateNetworkService } from "app/shared/services";

@Component({
	selector: "address-book",
	templateUrl: "./address-book.page.html",
	styleUrls: ["./address-book.page.scss"]
})
export class AddressBookPage implements OnInit {
	@ViewChild("selector") _selector: ElementRef;

	public destinations: Destination[];
	public glyphHeadings = Array.from("123456");

	private get selector(): HTMLElement {
		return this._selector.nativeElement;
	}

	constructor(private gateNetwork: GateNetworkService) {}

	ngOnInit() {
		this.destinations = this.gateNetwork.getAllAddresses();
	}

	public moveSelector(target: HTMLElement): TimelineLite {
		let topOfTarget = target.getBoundingClientRect().top;
		return new TimelineLite()
			.to(this.selector, 0.5, { top: topOfTarget })
			.set(target, { className: "+=selected" });
	}

	public removeSelector(target: HTMLElement): TimelineLite {
		TweenLite.killTweensOf(target);
		return new TimelineLite().set(target, { className: "-=selected" })
	}
}
