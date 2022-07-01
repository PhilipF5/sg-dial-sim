import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Glyph, Glyphs } from "app/shared/models";
import { Subject } from "rxjs";

@Component({
	selector: "sg-glyph-selection",
	templateUrl: "./glyph-selection.page.html",
	styleUrls: ["./glyph-selection.page.scss"],
})
export class GlyphSelectionPage implements OnDestroy, OnInit {
	public glyphs: Glyph[] = [...Glyphs.standard, Glyphs.pointOfOrigin];
	public selection: Glyph[] = [];

	private killSubscriptions: Subject<{}> = new Subject();

	constructor(private route: ActivatedRoute, private router: Router, private store$: Store<any>) {}

	ngOnDestroy() {
		this.killSubscriptions.next();
	}

	ngOnInit() {}

	public isGlyphSelected(glyph: Glyph): boolean {
		return this.selection.includes(glyph);
	}

	public selectGlyph(glyph: Glyph): void {
		if (this.selection[this.selection.length - 1] === glyph) {
			this.selection.pop();
		} else if (this.selection.includes(glyph)) {
			do {
				this.selection.pop();
			} while (this.selection.includes(glyph));
		} else if (glyph === Glyphs.pointOfOrigin) {
			if (this.selection.length >= 6) {
				this.router.navigate(
					["/dialing-computer/gate-screen", { dest: this.selection.map((g) => g.char).join("") }],
					{ skipLocationChange: true },
				);
			}
		} else if (this.selection.length <= 6) {
			this.selection.push(glyph);
		}
	}
}
