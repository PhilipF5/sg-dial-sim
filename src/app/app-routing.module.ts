import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DialingComputerPage } from "../pages/dialing-computer/dialing-computer.page";

const routes: Routes = [{ path: "**", component: DialingComputerPage }];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
