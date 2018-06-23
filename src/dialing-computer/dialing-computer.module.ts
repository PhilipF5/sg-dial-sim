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

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

import { DialingComputerRoutingModule } from "./dialing-computer-routing.module";

import { COMPONENTS } from "./components";
import { PAGES } from "./pages";
import { SERVICES } from "./services";

@NgModule({
	declarations: [COMPONENTS, PAGES],
	imports: [CommonModule, SharedModule, DialingComputerRoutingModule],
	exports: [COMPONENTS, PAGES],
	providers: [SERVICES]
})
export class DialingComputerModule {}
