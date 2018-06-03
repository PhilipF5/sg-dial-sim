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
