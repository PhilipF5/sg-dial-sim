const { app, BrowserWindow } = require("@electron/remote");
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
	getAllWindows() {
		return BrowserWindow.getAllWindows();
	},

	getFocusedWindow() {
		return BrowserWindow.getFocusedWindow();
	},

	async invoke(eventName, ...params) {
		return await ipcRenderer.invoke(eventName, ...params);
	},

	quit() {
		app.quit();
	},
});
