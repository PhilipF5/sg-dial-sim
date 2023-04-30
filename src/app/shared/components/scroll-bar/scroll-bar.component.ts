import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from "@angular/core";
import { gsap } from "gsap";

@Component({
	selector: "sg-scroll-bar",
	templateUrl: "./scroll-bar.component.html",
	styleUrls: ["./scroll-bar.component.scss"],
})
export class ScrollBarComponent {
	@Input() size: number;
	@Output() changeSelection: EventEmitter<number> = new EventEmitter<number>();
	@ViewChild("downButton", { static: true }) private _downButton: ElementRef;
	@ViewChild("upButton", { static: true }) private _upButton: ElementRef;

	public get elem(): HTMLElement {
		return this._elem.nativeElement;
	}

	private selectedItem: number = 0;

	constructor(private _elem: ElementRef) {}

	@HostListener("window:keyup.arrowdown")
	@HostListener("window:keyup.arrowup")
	public clearHighlight(): void {
		gsap.set([this._downButton.nativeElement, this._upButton.nativeElement], { clearProps: "all" });
	}

	@HostListener("window:keydown.arrowdown")
	public moveCursorDown(): void {
		if (this.selectedItem < this.size - 1) {
			this.changeSelection.emit(++this.selectedItem);
			this.highlightButton(this._downButton);
		} else {
			this.highlightButton(this._downButton, true);
		}
	}

	@HostListener("window:keydown.arrowup")
	public moveCursorUp(): void {
		if (this.selectedItem > 0) {
			this.changeSelection.emit(--this.selectedItem);
			this.highlightButton(this._upButton);
		} else {
			this.highlightButton(this._upButton, true);
		}
	}

	private highlightButton(button: ElementRef, failure?: boolean): void {
		const backgroundColor = failure ? "var(--red-color)" : "var(--secondary-color)";
		gsap.set(button.nativeElement, { color: "var(--black-color)", backgroundColor });
	}
}
