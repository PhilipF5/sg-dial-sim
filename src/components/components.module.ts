import { NgModule } from "@angular/core";
import { GateComponent } from "./gate/gate";
import { KeyboardComponent } from "./keyboard/keyboard";
@NgModule({
	declarations: [GateComponent, KeyboardComponent],
	imports: [],
	exports: [GateComponent, KeyboardComponent]
})
export class ComponentsModule {}
