import { Component, ElementRef, EventEmitter, OnInit, Output } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { shutdownGate } from "app/dialing-computer/actions";
import { getGateStatus } from "app/dialing-computer/selectors";
import { GateStatus, Glyph, Glyphs } from "app/shared/models";
import { GateNetworkService } from "app/shared/services";
import { gsap } from "gsap";

@Component({
	selector: "sg-keyboard",
	templateUrl: "./keyboard.component.html",
	styleUrls: ["./keyboard.component.scss"],
})
export class KeyboardComponent implements OnInit {
	@Output() dialAddress: EventEmitter<Glyph[]> = new EventEmitter();

	public address: Glyph[] = [];
	public displayShutdownButton: boolean = true;
	public isDialingAvailable: boolean;
	public keys: Glyph[] = Glyphs.standard;
	public submitText: string = "Dial";

	public get addressWithOrigin(): Glyph[] {
		let address = this.address.slice();
		if (this.address.length >= 6 && this.address[this.address.length - 1] != Glyphs.pointOfOrigin) {
			address.push(Glyphs.pointOfOrigin);
		}
		return address;
	}

	public get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	constructor(private _elem: ElementRef, private gateNetwork: GateNetworkService, private store$: Store<any>) {}

	ngOnInit() {
		this.store$.pipe(select(getGateStatus)).subscribe((status) => {
			switch (status) {
				case GateStatus.Idle:
					this.isDialingAvailable = true;
					break;
				case GateStatus.Aborted:
				case GateStatus.Shutdown:
					this.clearAddress();
				default:
					this.isDialingAvailable = false;
			}
		});
	}

	public backspace(): void {
		this.address.pop();
	}

	public clearAddress(): void {
		this.address = [];
	}

	public closeKeyboard(): void {
		gsap.to(this.elem, { duration: 1, scale: 0 });
	}

	public isAddressValid(): boolean {
		return !!this.gateNetwork.getActiveAddress(this.addressWithOrigin);
	}

	public isGlyphNumberInactive(glyph: number): boolean {
		return glyph > 6;
	}

	public isGlyphNumberSelected(glyph: number): boolean {
		return !!this.address[glyph - 1];
	}

	public isGlyphSelected(glyph: Glyph): boolean {
		return !!this.address.find(({ position }) => position === glyph.position);
	}

	public loadAddressById(id: string): void {
		this.address = this.gateNetwork.getDestinationById(id).address.slice();
	}

	public open(glyphs?: Glyph[]): void {
		gsap.to(this.elem, { duration: 1, scale: 1 });
		this.address = glyphs || [];
	}

	public selectGlyph(glyph: Glyph): void {
		if (this.address.length < 6 && !this.isGlyphSelected(glyph)) {
			this.address.push(glyph);
		}
	}

	public shutdown(): void {
		this.store$.dispatch(shutdownGate());
		this.closeKeyboard();
	}

	public validateAndDial(): void {
		if (this.address.length === 6) {
			this.dialAddress.emit(this.address);
			this.closeKeyboard();
		}
	}
}
