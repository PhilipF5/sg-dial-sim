import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ElectronService {
	public windowSizeChanges$: Subject<void> = new Subject();

	public get focusedWindow(): Electron.BrowserWindow {
		return (<any>window).electron.getFocusedWindow();
	}

	public get isElectronApp(): boolean {
		return !!(<any>window)?.process?.type;
	}

	constructor() {
		const registerSizeChange = () => this.windowSizeChanges$.next();
		if (this.isElectronApp) {
			const electronWindow = (<any>window).electron.getAllWindows()[0];
			electronWindow
				.addListener("resize", registerSizeChange)
				.addListener("enter-full-screen", registerSizeChange)
				.addListener("leave-full-screen", registerSizeChange);
		}
	}

	public async get(key: string): Promise<any> {
		return (<any>window).electron.invoke("getStoreValue", key);
	}

	public async set(key: string, value: any): Promise<void> {
		return (<any>window).electron.invoke("setStoreValue", key, value);
	}

	public quit(): void {
		(<any>window).electron.quit();
	}
}
