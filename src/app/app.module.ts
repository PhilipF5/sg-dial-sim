import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { DialingComputerModule } from "../dialing-computer/dialing-computer.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		DialingComputerModule,
		SharedModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
