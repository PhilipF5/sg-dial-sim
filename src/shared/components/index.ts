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

import { EventHorizonComponent } from "./event-horizon/event-horizon.component";
import { GateComponent } from "./gate/gate.component";
import { MenuComponent } from "./menu/menu.component";
import { SegmentDisplayComponent } from "./segment-display/segment-display.component";

export { EventHorizonComponent } from "./event-horizon/event-horizon.component";
export { GateComponent } from "./gate/gate.component";
export { MenuComponent } from "./menu/menu.component";
export { SegmentDisplayComponent } from "./segment-display/segment-display.component";

export const COMPONENTS = [
	EventHorizonComponent,
	GateComponent,
	MenuComponent,
	SegmentDisplayComponent
];
