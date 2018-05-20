import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GateComponent } from "./gate/gate.component";
import { KeyboardComponent } from "./keyboard/keyboard.component";

@NgModule({
	declarations: [GateComponent, KeyboardComponent],
	imports: [CommonModule],
	exports: [GateComponent, KeyboardComponent]
})
export class ComponentsModule {}
