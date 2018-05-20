import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialingComputerPage } from "./dialing-computer/dialing-computer.page";
import { ComponentsModule } from "../components/components.module";

@NgModule({
	declarations: [DialingComputerPage],
	imports: [CommonModule, ComponentsModule],
	exports: [DialingComputerPage]
})
export class PagesModule {}
