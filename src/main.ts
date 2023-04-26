import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
	enableProdMode();
}

platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch((err) => console.log(err));

gsap.registerPlugin(CustomEase, DrawSVGPlugin);
CustomEase.create("iris", "M0,0,C0,0,0.066,0.114,0.132,0.124,0.69,0.206,0.332,0.866,0.9,0.936,0.965,0.944,1,1,1,1");
