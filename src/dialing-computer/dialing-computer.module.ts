import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

import { DialingComputerRoutingModule } from "./dialing-computer-routing.module";

import { COMPONENTS } from "./components";
import { PAGES } from "./pages";

@NgModule({
	declarations: [COMPONENTS, PAGES],
	imports: [CommonModule, SharedModule, DialingComputerRoutingModule],
	exports: [COMPONENTS, PAGES]
})
export class DialingComputerModule {}
