import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialingStatusComponent } from "./dialing-status/dialing-status.component";
import { GateComponent } from "./gate/gate.component";
import { KeyboardComponent } from "./keyboard/keyboard.component";

@NgModule({
	declarations: [DialingStatusComponent, GateComponent, KeyboardComponent],
	imports: [CommonModule],
	exports: [DialingStatusComponent, GateComponent, KeyboardComponent]
})
export class ComponentsModule {}
