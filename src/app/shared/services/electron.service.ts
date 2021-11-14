import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ElectronService {
	private electron: any;
	public windowSizeChanges$: Subject<void> = new Subject();

	public get focusedWindow(): Electron.BrowserWindow {
		return this.electron.getFocusedWindow();
	}

	public get isElectronApp(): boolean {
		return !!(<any>window)?.process?.type;
	}

	constructor() {
		const registerSizeChange = () => this.windowSizeChanges$.next();
		if (this.isElectronApp) {
			this.electron = (<any>window).electron;
			const electronWindow = this.electron.getAllWindows()[0];
			electronWindow
				.addListener("resize", registerSizeChange)
				.addListener("enter-full-screen", registerSizeChange)
				.addListener("leave-full-screen", registerSizeChange);
		}
	}

	public async get(key: string): Promise<any> {
		return this.electron.invoke("getStoreValue", key);
	}

	public async set(key: string, value: any): Promise<void> {
		return this.electron.invoke("setStoreValue", key, value);
	}

	public quit(): void {
		this.electron.quit();
	}
}
