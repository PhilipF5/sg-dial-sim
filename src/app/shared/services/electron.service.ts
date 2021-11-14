import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class ElectronService {
	private electron: any;
	public windowSizeChanges$: Subject<void> = new Subject();

	public get isElectronApp(): boolean {
		return !!this.electron;
	}

	constructor() {
		const registerSizeChange = () => this.windowSizeChanges$.next();
		this.electron = (<any>window).electron;
		if (this.isElectronApp) {
			this.electron.addEventListener("resize", registerSizeChange);
			this.electron.addEventListener("enter-full-screen", registerSizeChange);
			this.electron.addEventListener("leave-full-screen", registerSizeChange);
		}
	}

	public async get(key: string): Promise<any> {
		return this.electron.invoke("getStoreValue", key);
	}

	public async set(key: string, value: any): Promise<void> {
		return this.electron.invoke("setStoreValue", key, value);
	}

	public toggleFullScreen(): void {
		this.electron.toggleFullScreen();
	}

	public quit(): void {
		this.electron.quit();
	}
}
