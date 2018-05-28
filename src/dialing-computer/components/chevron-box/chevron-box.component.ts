import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from "@angular/core";

import { TimelineLite } from "gsap";

@Component({
	selector: "chevron-box",
	templateUrl: "./chevron-box.component.html",
	styleUrls: ["./chevron-box.component.scss"]
})
export class ChevronBoxComponent {
	@Input("chevronEngaged")
	public chevronEngaged: number;

	@Output()
	public engageSymbol: EventEmitter<{ chevron: number, timeline: TimelineLite }> = new EventEmitter();

	@Input()
	public gatePosition: DOMRect;

	@Input()
	public glyph: string;

	@Input()
	public number: number;

	@ViewChild("chevronBox", { read: ElementRef })
	private chevronBox: ElementRef;

	private position: DOMRect;

	@ViewChild("symbol")
	private symbol: ElementRef;

	ngOnChanges(changes: SimpleChanges) {
		if (changes.chevronEngaged && this.chevronEngaged === this.number) {
			this.engageSymbol.emit({
				chevron: this.number,
				timeline: this.createSymbolTimeline(this.gatePosition)
			});
		}
	}

	public createSymbolTimeline(gatePosition: DOMRect): TimelineLite {
		this.updateSymbolPosition();

		let startX =
			gatePosition.x + (gatePosition.width / 2) -
			this.position.x - (this.position.width / 2);
		let startY = gatePosition.y - this.position.y + 50;
		let centerY =
			gatePosition.y + (gatePosition.height / 2) -
			this.position.y - (this.position.height / 2);

		let timeline = new TimelineLite();
		timeline.set(this.symbol.nativeElement, { x: startX, y: startY, scale: 0 });
		timeline.set(this.symbol.nativeElement, { css: { className: "+=active" } });
		timeline.to(this.symbol.nativeElement, 2, { y: centerY, scale: 5 });
		timeline.to(this.symbol.nativeElement, 2, { x: 0, y: 0, scale: 1 });
		timeline.to(this.chevronBox.nativeElement, 0.5, { css: { className: "+=locked" } });

		return timeline;
	}

	private updateSymbolPosition(): void {
		this.position = this.symbol.nativeElement.getBoundingClientRect();
	}
}
