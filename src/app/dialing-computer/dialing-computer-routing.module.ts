import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AddressBookPage, DialingComputerPage } from "./pages";

const routes: Routes = [
	{
		path: "dialing-computer",
		component: DialingComputerPage,
	},
	{
		path: "dialing-computer/address-book",
		component: AddressBookPage,
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class DialingComputerRoutingModule {}
