import { NgModule } from "@angular/core";
import { GateComponent } from "./gate/gate.component";
import { KeyboardComponent } from "./keyboard/keyboard.component";
@NgModule({
	declarations: [GateComponent, KeyboardComponent],
	imports: [],
	exports: [GateComponent, KeyboardComponent]
})
export class ComponentsModule {}
