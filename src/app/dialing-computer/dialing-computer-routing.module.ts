import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddressBookPage, GateScreenPage, GlyphSelectionPage } from "./pages";

const routes: Routes = [
	{
		path: "dialing-computer",
		redirectTo: "dialing-computer/gate-screen",
		pathMatch: "full",
	},
	{
		path: "dialing-computer/gate-screen",
		component: GateScreenPage,
	},
	{
		path: "dialing-computer/address-book",
		component: AddressBookPage,
	},
	{
		path: "dialing-computer/glyph-selection",
		component: GlyphSelectionPage,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class DialingComputerRoutingModule {}
