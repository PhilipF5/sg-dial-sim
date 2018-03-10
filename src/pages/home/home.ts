import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import gsap from "gsap";

@Component({
	selector: "page-home",
	templateUrl: "home.html"
})
export class HomePage {
	toolTimeline = new gsap.TimelineLite();
	glyphs = ["B", "C", "D", "E", "F", "G", "A"];

	constructor(public navCtrl: NavController) {}

	animateChevron(chevron: number) {
		let chevronTimeline = new gsap.TimelineLite();
		chevronTimeline.to(`.chevron-${chevron}.sg1-symbol`, 2, { css: { className: "+=engaged" } });
		chevronTimeline.set(`.chevron-${chevron}.sg1-symbol`, { css: { className: "-=starting" } });
		chevronTimeline.to(`.chevron-${chevron}.sg1-symbol`, 2, { css: { className: "-=engaged" } });
		chevronTimeline.add([
			gsap.TweenLite.to(`.chevron-${chevron}.chevron-box`, 0.5, { css: { className: "+=locked" } }),
			gsap.TweenLite.to(`.chevron-${chevron} > .chevron-tail`, 0.5, { stroke: "red" }),
			gsap.TweenLite.to(`.chevron-${chevron} > .chevron-head`, 0.5, { fill: "red" })
		]);
		let lockAnimation = (chevron === 7 ? this.animateLocking(true) : this.animateLocking());
		chevronTimeline.add(lockAnimation, 2);
		return chevronTimeline;
	}

	animateLocking(finish?: boolean, fail?: boolean) {
		let chevronTimeline = new gsap.TimelineLite();
		chevronTimeline.to(`.chevron-tail.chevron-7`, 0.5, { y: 20 });
		chevronTimeline.to(`.chevron-head.chevron-7`, 0.5, { y: -10 });
		if (!fail) {
			chevronTimeline.add([
				gsap.TweenLite.to(`.chevron-7.chevron-tail-border`, 0.5, { stroke: "red" }),
				gsap.TweenLite.to(`.chevron-7.chevron-head`, 0.5, { fill: "red" })
			]);
			chevronTimeline.add([
				gsap.TweenLite.to(`.chevron-tail.chevron-7`, 0.5, { y: 0 }),
				gsap.TweenLite.to(`.chevron-head.chevron-7`, 0.5, { y: 0 })
			], "+=0.5");
		}
		if (!finish) {
			chevronTimeline.add([
				gsap.TweenLite.to(`.chevron-7.chevron-tail-border`, 0.5, { stroke: "#87cefa" }),
				gsap.TweenLite.to(`.chevron-7.chevron-head`, 0.5, { fill: "none" })
			], "+=0.5");
		}
		return chevronTimeline;
	}

	ionViewDidLoad() {
		for (let i = 1; i <= 7; i++) {
			this.toolTimeline.add(this.animateChevron(i));
		}
	}
}
