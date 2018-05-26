import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { COMPONENTS } from "./components";

@NgModule({
	declarations: [COMPONENTS],
	imports: [CommonModule],
	exports: [COMPONENTS]
})
export class SharedModule {}
