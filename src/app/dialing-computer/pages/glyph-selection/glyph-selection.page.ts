import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { getUser } from "app/dialing-computer/selectors";
import { Destination, Glyph, Glyphs } from "app/shared/models";
import { GateNetworkService } from "app/shared/services";
import { sortBy } from "lodash-es";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
	selector: "sg-glyph-selection",
	templateUrl: "./glyph-selection.page.html",
	styleUrls: ["./glyph-selection.page.scss"],
})
export class GlyphSelectionPage implements OnDestroy, OnInit {
	public authCode: string;
	public currentDestination: Destination;
	public glyphs: Glyph[] = [...sortBy(Glyphs.standard, (g) => g.name), { ...Glyphs.pointOfOrigin, name: "[DIAL]" }];
	public selection: Glyph[] = [];

	private killSubscriptions: Subject<{}> = new Subject();

	constructor(private gateNetwork: GateNetworkService, private router: Router, private store$: Store) {}

	ngOnDestroy() {
		this.killSubscriptions.next({});
	}

	ngOnInit() {
		this.store$.pipe(select(getUser), takeUntil(this.killSubscriptions)).subscribe(({ authCode }) => {
			this.authCode = authCode;
		});
	}

	public goToGateScreen(dest?: string) {
		const params: any = {};
		if (dest) {
			params.dest = dest;
		}

		this.router.navigate(["/dialing-computer/gate-screen", params], {
			skipLocationChange: true,
		});
	}

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
		} else if (glyph.char === Glyphs.pointOfOrigin.char) {
			if (this.selection.length >= 6) {
				this.goToGateScreen(this.selection.map((g) => g.char).join(""));
			}
		} else if (this.selection.length <= 6) {
			this.selection.push(glyph);
		}

		this.currentDestination = this.gateNetwork.getDestinationByAddress(this.selection);
	}
}
