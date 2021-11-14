const { app, BrowserWindow, process } = require("@electron/remote");
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
	addEventListener(event, handler) {
		return BrowserWindow.getAllWindows()[0].addListener(event, handler);
	},

	getAllWindows() {
		return BrowserWindow.getAllWindows();
	},

	getFocusedWindow() {
		return BrowserWindow.getFocusedWindow();
	},

	getProcessType() {
		return process.type;
	},

	async invoke(eventName, ...params) {
		return await ipcRenderer.invoke(eventName, ...params);
	},

	toggleFullScreen() {
		const focusedWindow = BrowserWindow.getFocusedWindow();
		focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
	},

	quit() {
		app.quit();
	},
});
