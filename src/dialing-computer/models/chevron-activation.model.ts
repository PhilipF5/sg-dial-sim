import { TimelineLite } from "gsap";

import { Glyph } from "shared/models";

export interface ChevronActivation {
	chevron: number;
	chevronTimeline?: TimelineLite;
	glyph: Glyph;
	symbolTimeline?: TimelineLite;
}
