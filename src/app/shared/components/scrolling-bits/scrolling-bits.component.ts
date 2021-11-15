import { Component, Input, OnInit } from "@angular/core";
@Component({
	selector: "sg-scrolling-bits",
	templateUrl: "./scrolling-bits.component.html",
	styleUrls: ["./scrolling-bits.component.scss"],
})
export class ScrollingBitsComponent implements OnInit {
	@Input() length: number;

	public bits: string = "";

	private _enabled: boolean = null;
	private _interval: any;

	public get enabled(): boolean {
		return this._enabled;
	}

	@Input()
	public set enabled(value: boolean) {
		if (value === this._enabled) {
			return;
		} else if (value && this._enabled !== null) {
			this.enable();
		} else if (!value && this._enabled) {
			this.disable();
		}

		this._enabled = value;
	}

	ngOnInit() {
		this.enabled && this.enable();
	}

	public disable(): void {
		clearInterval(this._interval);
	}

	public enable(): void {
		this.loadBits();
		this._interval = setInterval(() => this.loadBits(), 500);
	}

	private loadBits(): void {
		let bits = "";
		for (let i = 0; i < this.length; i++) {
			bits += Math.random() > 0.5 ? "1" : "0";
		}
		this.bits = bits;
	}
}
