import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.log(err));

gsap.registerPlugin(CustomEase);
