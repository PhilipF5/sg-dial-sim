import {
	AfterViewInit,
	Component,
	ElementRef,
	HostListener,
	NgZone,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren,
} from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { setDestination } from "app/dialing-computer/actions";
import { AddressRowComponent } from "app/dialing-computer/components";
import { Destination } from "app/shared/models";
import { AlertService, GateNetworkService } from "app/shared/services";
import { gsap } from "gsap";

@Component({
	selector: "sg-address-book",
	templateUrl: "./address-book.page.html",
	styleUrls: ["./address-book.page.scss"],
})
export class AddressBookPage implements OnInit {
	@ViewChildren(AddressRowComponent) addressRows: QueryList<AddressRowComponent>;

	public destinations: Destination[];
	public editingDestination?: Destination;
	public scrollOffset: number = 0;
	public topItem: number = 0;

	private modeIndex: number = 0;
	private modes: string[] = ["DIAL", "EDIT", "DELETE"];

	public get bottomItem(): number {
		return 7 + this.topItem;
	}

	public get canScrollDown(): boolean {
		return this.bottomItem < this.destinations.length;
	}

	public get canScrollUp(): boolean {
		return this.topItem > 0;
	}

	public get glyphHeadings(): string[] {
		return Array.from(Array(this.destinations[this.topItem].address.length + 1)).map((_, i) => (i + 1).toString());
	}

	public get mode(): string {
		return this.modes[this.modeIndex];
	}

	constructor(
		private alert: AlertService,
		private gateNetwork: GateNetworkService,
		private router: Router,
		private store$: Store<any>,
	) {}

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

	public goToGateScreen(dest?: string): void {
		if (dest) {
			this.router.navigate(["/dialing-computer/gate-screen", { dest }], { skipLocationChange: true });
		} else {
			this.router.navigate(["/dialing-computer/gate-screen"], { skipLocationChange: true });
		}
	}

	public loadAddress(dest: Destination): void {
		this.store$.dispatch(setDestination(dest));
		this.goToGateScreen(dest.address.map((glyph) => glyph.char).join(""));
	}

	public loadAddresses(): void {
		this.destinations = this.gateNetwork.getAllAddresses();
		if (this.mode === "EDIT") {
			this.addEmptyRow();
		}
	}

	public onCancelEdit(): void {
		this.loadAddresses();
		this.editingDestination = null;
	}

	@HostListener("window:keydown.enter")
	public onDestinationClick(dest?: Destination): void {
		dest ??= this.destinations[this.topItem];
		switch (this.mode) {
			case "DIAL": {
				this.loadAddress(dest);
				break;
			}
			case "EDIT": {
				if (dest.set === "Default") {
					this.alert.alerts.next({
						duration: 4000,
						title: "Invalid Operation",
						text1: "Destinations in Default set cannot be edited",
					});
				}
				break;
			}
			case "DELETE": {
				if (dest.set === "Default") {
					this.alert.alerts.next({
						duration: 4000,
						title: "Invalid Operation",
						text1: "Destinations cannot be deleted from Default set",
					});
				} else {
					this.gateNetwork.deleteDestination(dest);
					this.loadAddresses();
				}
			}
		}
	}

	public onRegisterUpdate(dest: Destination): void {
		this.editingDestination = dest;
	}

	public onSave(dest: Destination): void {
		this.editingDestination = null;
		if (dest.id === "") {
			this.gateNetwork.createDestination(dest);
		} else {
			this.gateNetwork.saveDestination(dest);
		}
		this.loadAddresses();
	}

	public onSelectionChange(newSelection: number): void {
		this.topItem = newSelection;
	}

	private addEmptyRow(): void {
		this.destinations.unshift(
			new Destination({
				coordinates: Array.from(Array(6)),
				desc: "",
				id: "",
				name: "",
				set: "",
			}),
		);
	}
}
