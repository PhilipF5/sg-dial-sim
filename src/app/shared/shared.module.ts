import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { COMPONENTS } from "./components";
import { DIRECTIVES } from "./directives";
import { PIPES } from "./pipes";
import { SERVICES } from "./services";

@NgModule({
	declarations: [COMPONENTS, DIRECTIVES, PIPES],
	imports: [CommonModule],
	exports: [COMPONENTS, DIRECTIVES, PIPES],
	providers: [SERVICES],
})
export class SharedModule {}
