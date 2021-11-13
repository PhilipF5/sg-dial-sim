import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{ path: "", redirectTo: "dialing-computer/gate-screen", pathMatch: "full" }];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: "legacy" })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
