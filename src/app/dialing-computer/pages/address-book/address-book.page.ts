import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { Router } from "@angular/router";
import { AddressRowComponent } from "app/dialing-computer/components";
import { Destination } from "app/shared/models";
import { GateNetworkService } from "app/shared/services";
import { TimelineLite, TweenLite } from "gsap";

@Component({
	selector: "address-book",
	templateUrl: "./address-book.page.html",
	styleUrls: ["./address-book.page.scss"],
})
export class AddressBookPage implements AfterViewInit, OnInit {
	@ViewChildren(AddressRowComponent) addressRows: QueryList<AddressRowComponent>;
	@ViewChild("selector", { static: true }) _selector: ElementRef;

	public destinations: Destination[];
	public glyphHeadings = Array.from("123456");
	public scrollOffset: number = 0;

	private selectedIndex: number;
	private selectorTimeline: TimelineLite = new TimelineLite();

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

	constructor(private gateNetwork: GateNetworkService, private router: Router) {}

	ngAfterViewInit() {
		TweenLite.set(this.selector, { top: -250 });
		this.addressRows.changes.subscribe(() => {
			if (this.selectedIndex !== undefined) {
				this.moveSelector(this.addressRowElems[this.selectedIndex], true);
			}
		});
	}

	ngOnInit() {
		this.destinations = this.gateNetwork.getAllAddresses();
	}

	public goToGateScreen(dest?: number): void {
		if (dest) {
			this.router.navigate(["/dialing-computer/gate-screen", { dest }], { skipLocationChange: true });
		} else {
			this.router.navigate(["/dialing-computer/gate-screen"], { skipLocationChange: true });
		}
	}

	public loadAddress(dest: Destination): void {
		this.goToGateScreen(dest.id);
	}

	public moveSelector(target: HTMLElement, instant?: boolean): TimelineLite {
		this.selectorTimeline.kill();
		this.selectedIndex = this.addressRowElems.findIndex(el => el === target);
		let targetBox = target.getBoundingClientRect();
		let borderAdjustment = 6; // 6 to adjust for 3px border due to box-sizing
		return (this.selectorTimeline = new TimelineLite()
			.add(this.removeSelector(this.addressRowElems.filter(el => el !== target)))
			.set(this.selector, { opacity: 1, width: targetBox.right - targetBox.left - borderAdjustment })
			.to(this.selector, instant ? 0 : 0.5, { top: targetBox.top })
			.set(target, { className: "+=selected" }));
	}

	public removeSelector(targets: HTMLElement[]): TimelineLite {
		return new TimelineLite().set(targets, { className: "-=selected" });
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
