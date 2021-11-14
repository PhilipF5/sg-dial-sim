import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DialingComputerModule } from "./dialing-computer/dialing-computer.module";
import { SharedModule } from "./shared/shared.module";

const MODULES = [
	BrowserModule,
	StoreModule.forRoot({}),
	StoreDevtoolsModule.instrument(),
	EffectsModule.forRoot([]),
	DialingComputerModule,
	SharedModule,
	AppRoutingModule,
];

@NgModule({
	declarations: [AppComponent],
	imports: [MODULES],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
