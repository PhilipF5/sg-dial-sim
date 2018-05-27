import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { Power4, TimelineLite, TweenLite, TweenMax } from "gsap";
import { GateComponent } from "../../../shared/components";
import { ChevronBoxComponent } from "../../components";

@Component({
	selector: "dialing-computer",
	templateUrl: "./dialing-computer.page.html",
	styleUrls: ["./dialing-computer.page.scss"]
})
export class DialingComputerPage {
	public gatePosition: DOMRect;
	public glyphs: string[] = ["B", "C", "D", "E", "F", "G", "A"];
	public status: string = "IDLE";

	@ViewChildren(ChevronBoxComponent)
	private chevronBoxes: QueryList<ChevronBoxComponent>;

	@ViewChild(GateComponent, { read: ElementRef })
	private gateElement: ElementRef;

	private toolTimeline = new TimelineLite();

	constructor(private changeDetectorRef: ChangeDetectorRef) {}

	animateChevron(chevron: number) {
		let chevronTimeline = new TimelineLite();
		let chevronBox = this.chevronBoxes.find(box => box.number === chevron);
		chevronTimeline.add(chevronBox.engageSymbol(this.gatePosition));
		chevronTimeline.add([
			TweenLite.to(`.chevron-${chevron} > .chevron-tail`, 0.5, { stroke: "red" }),
			TweenLite.to(`.chevron-${chevron} > .chevron-head`, 0.5, { fill: "red" })
		]);
		let lockAnimation = chevron === 7 ? this.animateLocking(true) : this.animateLocking();
		chevronTimeline.add(lockAnimation, 2);
		return chevronTimeline;
	}

	animateLocking(finish?: boolean, fail?: boolean) {
		let chevronTimeline = new TimelineLite();
		chevronTimeline.add([
			TweenLite.to(`.chevron-tail.chevron-7`, 0.5, { y: 20 }),
			TweenLite.to(`.chevron-7.chevron-back`, 0.5, { y: 20 })
		]);
		chevronTimeline.to(`.chevron-head.chevron-7`, 0.5, { y: -10 });
		if (!fail) {
			chevronTimeline.add([
				TweenLite.to(`.chevron-7.chevron-tail-border`, 0.5, { stroke: "red" }),
				TweenLite.to(`.chevron-7.chevron-head`, 0.5, { fill: "red" })
			]);
			chevronTimeline.add(
				[
					TweenLite.to(`.chevron-tail.chevron-7`, 0.5, { y: 0 }),
					TweenLite.to(`.chevron-head.chevron-7`, 0.5, { y: 0 }),
					TweenLite.to(`.chevron-7.chevron-back`, 0.5, { y: 0 })
				],
				"+=0.5"
			);
		}
		if (!finish) {
			chevronTimeline.add(
				[
					TweenLite.to(`.chevron-7.chevron-tail-border`, 0.5, { stroke: "#87cefa" }),
					TweenLite.to(`.chevron-7.chevron-head`, 0.5, { fill: "none" })
				],
				"+=0.5"
			);
		} else {
			chevronTimeline.add(
				[
					TweenMax.to(`.chevron-symbol-box`, 0.15, { backgroundColor: "#add8e6" })
						.repeat(5)
						.yoyo(true)
				],
				"-=0.5"
			);
			chevronTimeline.add(() => {
				this.status = "ACTIVE";
				this.changeDetectorRef.detectChanges();
			});
		}
		return chevronTimeline;
	}

	public beginDialing(address: string[]) {
		address.push("A");
		this.glyphs = address;
		this.runDialingSequence();
	}

	public closeKeyboard() {
		TweenMax.to(`.keyboard`, 1, { css: { className: "+=minimized" } });
	}

	public keyboardCloseHandler() {
		this.closeKeyboard();
	}

	public keyboardStartDialingHandler(event: string[]) {
		this.beginDialing(event);
	}

	public openKeyboard() {
		TweenMax.to(`.keyboard`, 1, { css: { className: "-=minimized" } });
	}

	runDialingSequence() {
		this.updateGatePosition();
		for (let i = 1; i <= 7; i++) {
			this.toolTimeline.add(this.animateChevron(i));
		}
	}

	private updateGatePosition(): void {
		this.gatePosition = this.gateElement.nativeElement.getBoundingClientRect();
	}
}
