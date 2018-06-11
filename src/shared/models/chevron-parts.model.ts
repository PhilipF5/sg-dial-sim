import { ElementRef } from "@angular/core";

export interface ChevronParts {
	back: ElementRef;
	head: ElementRef;
	lines: ElementRef[];
	tail: ElementRef;
	tailBorder?: ElementRef;
}
