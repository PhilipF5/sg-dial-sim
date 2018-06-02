import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { COMPONENTS } from "./components";
import { SERVICES } from "./services";

@NgModule({
	declarations: [COMPONENTS],
	imports: [CommonModule],
	exports: [COMPONENTS],
	providers: [SERVICES]
})
export class SharedModule {}
