import {
	AfterViewInit,
	Component,
	ElementRef,
	NgZone,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren,
} from "@angular/core";
import { Router } from "@angular/router";
import { AddressRowComponent } from "app/dialing-computer/components";
import { Destination } from "app/shared/models";
import { AlertService, GateNetworkService } from "app/shared/services";
import { gsap } from "gsap";

@Component({
	selector: "sg-address-book",
	templateUrl: "./address-book.page.html",
	styleUrls: ["./address-book.page.scss"],
})
export class AddressBookPage implements AfterViewInit, OnInit {
	@ViewChildren(AddressRowComponent) addressRows: QueryList<AddressRowComponent>;
	@ViewChild("selector", { static: true }) _selector: ElementRef;

	public destinations: Destination[];
	public editingDestination?: Destination;
	public scrollOffset: number = 0;

	private modeIndex: number = 0;
	private modes: string[] = ["DIAL", "EDIT", "DELETE"];
	private selectedIndex: number;
	private selectorTimeline: gsap.core.Timeline = gsap.timeline();

	public get bottomItem(): number {
		return 5 + this.scrollOffset;
	}

	public get canScrollDown(): boolean {
		return this.bottomItem < this.destinations.length;
	}

	public get canScrollUp(): boolean {
		return this.topItem > 0;
	}

	public get glyphHeadings(): string[] {
		return Array.from(Array(this.destinations[this.topItem].address.length)).map((_, i) => (i + 1).toString());
	}

	public get mode(): string {
		return this.modes[this.modeIndex];
	}

	public get topItem(): number {
		return 0 + this.scrollOffset;
	}

	private get addressRowElems(): HTMLElement[] {
		return this.addressRows.map<HTMLElement>((ar) => ar.elem);
	}

	private get selector(): HTMLElement {
		return this._selector.nativeElement;
	}

	constructor(
		private alert: AlertService,
		private gateNetwork: GateNetworkService,
		private ngZone: NgZone,
		private router: Router,
	) {}

	ngAfterViewInit() {
		gsap.set(this.selector, { top: -250 });
		this.addressRows.changes.subscribe(() => {
			if (this.selectedIndex !== undefined) {
				this.moveSelector(this.addressRowElems[this.selectedIndex], true);
			}
		});
	}

	ngOnInit() {
		this.loadAddresses();
	}

	public cycleMode(): void {
		const nextIndex = this.modes[this.modeIndex + 1] ? this.modeIndex + 1 : 0;
		switch (nextIndex) {
			case 1: {
				this.addEmptyRow();
				break;
			}
			case 2: {
				this.destinations.shift();
				break;
			}
		}
		this.modeIndex = nextIndex;
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

	public loadAddresses(): void {
		this.destinations = this.gateNetwork.getAllAddresses();
		if (this.mode === "EDIT") {
			this.addEmptyRow();
		}
	}

	public moveSelector(target: HTMLElement, instant?: boolean): gsap.core.Timeline {
		this.selectorTimeline.kill();
		let targetBox = target.getBoundingClientRect();
		let borderAdjustment = 6; // 6 to adjust for 3px border due to box-sizing
		return (this.selectorTimeline = gsap
			.timeline()
			.add(() => this.ngZone.run(() => (this.selectedIndex = null)))
			.set(this.selector, { opacity: 1, width: targetBox.right - targetBox.left - borderAdjustment })
			.to(this.selector, instant ? 0 : 0.5, { top: targetBox.top })
			.add(() =>
				this.ngZone.run(() => (this.selectedIndex = this.addressRowElems.findIndex((el) => el === target))),
			));
	}

	public onCancelEdit(): void {
		this.loadAddresses();
		this.editingDestination = null;
	}

	public onDestinationClick(dest: Destination): void {
		switch (this.mode) {
			case "DIAL": {
				this.loadAddress(dest);
				break;
			}
			case "EDIT": {
				break;
			}
			case "DELETE": {
				if (dest.set === "Default") {
					this.alert.alerts.next({
						critical: true,
						duration: 4000,
						message: "Invalid Operation",
						title: "Destinations cannot be deleted from Default set",
					});
				} else {
					this.gateNetwork.deleteDestination(dest);
				}
			}
		}
	}

	public onRegisterUpdate(dest: Destination): void {
		this.editingDestination = dest;
	}

	public onSave(dest: Destination): void {
		this.editingDestination = null;
		this.gateNetwork.saveDestination(dest);
		this.loadAddresses();
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

	private addEmptyRow(): void {
		this.destinations.unshift({
			address: Array.from(Array(6)),
			desc: "",
			id: -1,
			name: "",
			set: "",
		});
	}
}
