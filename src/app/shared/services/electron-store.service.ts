import { Injectable } from "@angular/core";
import { ElectronService } from "ngx-electron";

@Injectable()
export class ElectronStoreService {
	constructor(private electron: ElectronService) {}

	public async get(key: string): Promise<any> {
		return this.electron.ipcRenderer.invoke("getStoreValue", key);
	}

	public async set(key: string, value: any): Promise<void> {
		return this.electron.ipcRenderer.invoke("setStoreValue", key, value);
	}
}
