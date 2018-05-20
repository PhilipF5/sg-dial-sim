import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { PagesModule } from "../pages/pages.module";

import { ComponentsModule } from "../components/components.module";

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, PagesModule, ComponentsModule],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
