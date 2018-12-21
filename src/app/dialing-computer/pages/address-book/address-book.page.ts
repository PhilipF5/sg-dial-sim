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
	public scrollOffset: number = 0;

	public get bottomItem(): number {
		return 5 + this.scrollOffset;
	}

	public get canScrollDown(): boolean {
		return !!this.destinations[this.bottomItem + 1];
	}

	public get canScrollUp(): boolean {
		return this.topItem > 0;
	}

	public get topItem(): number {
		return 0 + this.scrollOffset;
	}

	private get selector(): HTMLElement {
		return this._selector.nativeElement;
	}

	constructor(private gateNetwork: GateNetworkService) {}

	ngOnInit() {
		this.destinations = this.gateNetwork.getAllAddresses();
	}

	public moveSelector(target: HTMLElement): TimelineLite {
		let targetBox = target.getBoundingClientRect();
		// 6 to adjust for 3px border due to box-sizing
		return new TimelineLite()
			.set(this.selector, { opacity: 1 })
			.to(this.selector, 0.5, { top: targetBox.top, width: targetBox.right - targetBox.left - 6 })
			.set(target, { className: "+=selected" });
	}

	public removeSelector(target: HTMLElement): TimelineLite {
		TweenLite.killTweensOf(target);
		return new TimelineLite().set(target, { className: "-=selected" })
	}

	public scrollDown(): void {
		if (this.canScrollDown) {
			this.scrollOffset++;
		}
	}

	public scrollUp(): void {
		if (this.canScrollUp) {
			this.scrollOffset--;
		}
	}
}
