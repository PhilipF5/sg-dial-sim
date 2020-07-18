import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ElectronService } from "app/shared/services";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
@Component({
	selector: "sg-scrolling-bits",
	templateUrl: "./scrolling-bits.component.html",
	styleUrls: ["./scrolling-bits.component.scss"],
})
export class ScrollingBitsComponent implements OnDestroy, OnInit {
	@Input() length: number;

	@ViewChild("first", { static: true }) private _firstGroup: ElementRef;
	@ViewChild("second", { static: true }) private _secondGroup: ElementRef;

	public bits: string = "";

	private _enabled: boolean = null;
	private killSubscriptions: Subject<{}> = new Subject();
	private timeline: gsap.core.Timeline;

	public get enabled(): boolean {
		return this._enabled;
	}

	@Input()
	public set enabled(value: boolean) {
		if (value === this._enabled) {
			return;
		} else if (value && this._enabled !== null) {
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

	ngOnDestroy() {
		this.killSubscriptions.next();
	}

	ngOnInit() {
		gsap.registerPlugin(ScrollToPlugin);
		this.electron.windowSizeChanges$.pipe(takeUntil(this.killSubscriptions)).subscribe(() => this.restart());
		this.enabled && this.enable();
	}

	public disable(): void {
		this.bits = "";
		this.timeline.progress(0);
		this.timeline.kill();
		gsap.set(this.firstGroup, { opacity: 0 });
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
		this.timeline = gsap
			.timeline({ repeat: -1 })
			.to(this.elem, 10, { scrollTo: this.secondGroup.offsetTop, ease: "none" })
			.add(() => gsap.set(this.firstGroup, { opacity: 1 }))
			.set(this.elem, { scrollTo: 0 });
	}

	private loadBits(): void {
		let bits = "";
		for (let i = 0; i < this.length; i++) {
			bits += Math.random() > 0.5 ? "1" : "0";
		}
		this.bits = bits;
		this.cdRef.detectChanges();
	}
}
