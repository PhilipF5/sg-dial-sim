import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { COMPONENTS } from "./components";
import { DIRECTIVES } from "./directives";
import { SERVICES } from "./services";

@NgModule({
	declarations: [COMPONENTS, DIRECTIVES],
	imports: [CommonModule],
	exports: [COMPONENTS, DIRECTIVES],
	providers: [SERVICES]
})
export class SharedModule {}
