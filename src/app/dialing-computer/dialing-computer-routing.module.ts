import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AddressBookPage, GateScreenPage } from "./pages";

const routes: Routes = [
	{
		path: "dialing-computer",
		redirectTo: "dialing-computer/gate-screen",
		pathMatch: "full"
	},
	{
		path: "dialing-computer/gate-screen",
		component: GateScreenPage,
	},
	{
		path: "dialing-computer/address-book",
		component: AddressBookPage,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class DialingComputerRoutingModule {}
