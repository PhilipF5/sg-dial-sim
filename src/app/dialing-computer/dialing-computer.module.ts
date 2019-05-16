import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SharedModule } from "../shared/shared.module";

import { DialingComputerRoutingModule } from "./dialing-computer-routing.module";

import { COMPONENTS } from "./components";
import { EFFECTS } from "./effects";
import { PAGES } from "./pages";
import { dialingComputerReducer } from "./reducers";
import { SERVICES } from "./services";

const MODULES = [
	StoreModule.forFeature("dialingComputer", dialingComputerReducer),
	EffectsModule.forFeature(EFFECTS),
	CommonModule,
	SharedModule,
	DialingComputerRoutingModule,
];

@NgModule({
	declarations: [COMPONENTS, PAGES],
	imports: [MODULES],
	exports: [COMPONENTS, PAGES],
	providers: [SERVICES],
})
export class DialingComputerModule {}
