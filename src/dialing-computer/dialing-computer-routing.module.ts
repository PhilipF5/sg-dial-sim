import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DialingComputerPage } from "./pages";

const routes: Routes = [{ path: "**", component: DialingComputerPage }];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class DialingComputerRoutingModule {}
