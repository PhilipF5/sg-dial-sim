import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Linear, TimelineLite, TimelineMax, TweenLite } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ElectronService } from "ngx-electron";

const plugins = [ScrollToPlugin];

@Component({
	selector: "scrolling-bits",
	templateUrl: "./scrolling-bits.component.html",
	styleUrls: ["./scrolling-bits.component.scss"],
})
export class ScrollingBitsComponent implements OnInit {
	@Input() length: number;

	@ViewChild("first") private _firstGroup: ElementRef;
	@ViewChild("second") private _secondGroup: ElementRef;

	public bits: string = "";

	private _enabled: boolean;
	private timeline: TimelineLite;

	public get enabled(): boolean {
		return this._enabled;
	}

	@Input()
	public set enabled(value: boolean) {
		if (value === this._enabled) {
			return;
		} else if (value) {
			this.enable();
		}

		this._enabled = value;
	}

	private get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	private get firstGroup(): HTMLElement {
		return this._firstGroup.nativeElement;
	}

	private get secondGroup(): HTMLElement {
		return this._secondGroup.nativeElement;
	}

	constructor(private cdRef: ChangeDetectorRef, private electron: ElectronService, private _elem: ElementRef) {}

	ngOnInit() {
		if (this.electron.isElectronApp) {
			let electronWindow = this.electron.remote.BrowserWindow.getFocusedWindow();
			electronWindow
				.addListener("resize", () => this.restart())
				.addListener("enter-full-screen", () => this.restart())
				.addListener("leave-full-screen", () => this.restart());
		}
	}

	public disable(): void {
		this.bits = "";
		this.timeline.progress(0);
		this.timeline.kill();
		TweenLite.set(this.firstGroup, { opacity: 0 });
	}

	public enable(): void {
		this.loadBits();
		setTimeout(() => this.animate(), 100);
	}

	public restart(): void {
		this.disable();
		if (this.enabled) {
			this.enable();
		}
	}

	private animate(): void {
		this.cdRef.detectChanges();
		this.timeline = new TimelineMax({ repeat: -1 })
			.to(this.elem, 10, { scrollTo: this.secondGroup.offsetTop, ease: Linear.easeNone })
			.add(() => TweenLite.set(this.firstGroup, { opacity: 1 }))
			.set(this.elem, { scrollTo: 0 });
	}

	private loadBits(): void {
		for (let i = 0; i < this.length; i++) {
			if (Math.random() > 0.5) {
				this.bits += "1";
			} else {
				this.bits += "0";
			}
			this.cdRef.detectChanges();
		}
	}
}
