import { Injectable } from "@angular/core";
import { ElectronService as NgxElectronService } from "ngx-electron";
import { Subject } from "rxjs";

@Injectable()
export class ElectronService {
	public windowSizeChanges$: Subject<void> = new Subject();

	constructor(public ngxElectron: NgxElectronService) {
		const registerSizeChange = () => this.windowSizeChanges$.next();
		if (this.ngxElectron.isElectronApp) {
			const electronWindow = this.ngxElectron.remote.BrowserWindow.getAllWindows()[0];
			electronWindow
				.addListener("resize", registerSizeChange)
				.addListener("enter-full-screen", registerSizeChange)
				.addListener("leave-full-screen", registerSizeChange);
		}
	}

	public async get(key: string): Promise<any> {
		return this.ngxElectron.ipcRenderer.invoke("getStoreValue", key);
	}

	public async set(key: string, value: any): Promise<void> {
		return this.ngxElectron.ipcRenderer.invoke("setStoreValue", key, value);
	}
}
