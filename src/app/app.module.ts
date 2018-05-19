import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HomePageComponent } from "../components/home-page/home-page.component";
import { GateComponent } from "../components/gate/gate.component";
import { KeyboardComponent } from "../components/keyboard/keyboard.component";

@NgModule({
	declarations: [AppComponent, HomePageComponent, GateComponent, KeyboardComponent],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
