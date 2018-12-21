import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";

import { TimelineLite, TweenLite } from "gsap";

import { AddressRowComponent } from "app/dialing-computer/components";
import { Destination } from "app/shared/models";
import { GateNetworkService } from "app/shared/services";

@Component({
	selector: "address-book",
	templateUrl: "./address-book.page.html",
	styleUrls: ["./address-book.page.scss"]
})
export class AddressBookPage implements AfterViewInit, OnInit {
	@ViewChildren(AddressRowComponent) addressRows: QueryList<AddressRowComponent>;
	@ViewChild("selector") _selector: ElementRef;

	public destinations: Destination[];
	public glyphHeadings = Array.from("123456");
	public scrollOffset: number = 0;

	public get bottomItem(): number {
		return 5 + this.scrollOffset;
	}

	public get canScrollDown(): boolean {
		return this.bottomItem < this.destinations.length;
	}

	public get canScrollUp(): boolean {
		return this.topItem > 0;
	}

	public get topItem(): number {
		return 0 + this.scrollOffset;
	}

	private get addressRowElems(): HTMLElement[] {
		return this.addressRows.map<HTMLElement>(ar => ar.elem);
	}

	private get selector(): HTMLElement {
		return this._selector.nativeElement;
	}

	constructor(private gateNetwork: GateNetworkService) {}

	ngAfterViewInit() {
		TweenLite.set(this.selector, { top: -250 });
	}

	ngOnInit() {
		this.destinations = this.gateNetwork.getAllAddresses();
	}

	public moveSelector(target: HTMLElement): TimelineLite {
		let targetBox = target.getBoundingClientRect();
		// 6 to adjust for 3px border due to box-sizing
		return new TimelineLite()
			.add(this.removeSelector(this.addressRowElems.filter(el => el !== target)))
			.set(this.selector, { opacity: 1, width: targetBox.right - targetBox.left - 6 })
			.to(this.selector, 0.5, { top: targetBox.top })
			.set(target, { className: "+=selected" });
	}

	public removeSelector(targets: HTMLElement[]): TimelineLite {
		TweenLite.killTweensOf(targets);
		return new TimelineLite().set(targets, { className: "-=selected" })
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
