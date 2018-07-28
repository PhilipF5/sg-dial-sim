import { TimelineLite } from "gsap";

import { Glyph } from "shared/models";

export interface ChevronActivation {
	chevron: number;
	chevronTimeline?: TimelineLite;
	fail?: boolean;
	glyph: Glyph;
	symbolTimeline?: TimelineLite;
}
