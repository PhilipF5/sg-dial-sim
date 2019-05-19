import { Glyph } from "app/shared/models";
import { TimelineLite } from "gsap";

export interface ChevronActivation {
	chevron: number;
	chevronTimeline?: TimelineLite;
	fail?: boolean;
	glyph: Glyph;
	symbolTimeline?: TimelineLite;
}
