/* SGC Computer Simulator
Copyright (C) 2018  Philip Fulgham

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>. */

import { Elastic, Power1, Power4, TimelineLite, TweenMax } from "gsap";

export class EventHorizonAnimations {
	public static activeGlow(elem: HTMLElement): TimelineLite {
		return new TimelineLite().add(
			TweenMax.fromTo(elem, 1, { scale: 3, ease: Power1.easeInOut }, { scale: 2.75, ease: Power1.easeInOut })
				.repeat(-1)
				.yoyo(true)
		);
	}

	public static inactiveFlasher(elem: HTMLElement): TimelineLite {
		return new TimelineLite().add([
			TweenMax.fromTo(elem, 0.5, { scale: 0, ease: Power4.easeIn }, { scale: 1, ease: Power4.easeIn })
				.repeat(-1)
				.yoyo(true),
			TweenMax.set(elem, { opacity: 1 }),
		]);
	}

	public static gateOpen(elem: HTMLElement): TimelineLite {
		return new TimelineLite().add(this.kawoosh(elem)).add(this.activeGlow(elem));
	}

	public static kawoosh(elem: HTMLElement): TimelineLite {
		return new TimelineLite()
			.to(elem, 0.5, { scale: 0, ease: Power4.easeOut })
			.set(elem, { immediateRender: false, className: "activating" })
			.to(elem, 1, { scale: 4, ease: Power1.easeInOut })
			.to(elem, 2.5, { scale: 3, ease: Elastic.easeInOut, className: "active" });
	}

	public static shutdown(elem: HTMLElement): TimelineLite {
		return new TimelineLite()
			.to(elem, 1.5, { scale: 4, ease: Power1.easeInOut, className: "activating" })
			.to(elem, 0.5, { scale: 0, ease: Power4.easeIn })
			.to(elem, 1, { scale: 5, opacity: 0 })
			.set(elem, { immediateRender: false, className: "-=activating" });
	}
}
