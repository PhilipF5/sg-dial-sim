const { app, BrowserWindow, ipcMain } = require("electron");
const Store = require("electron-store");
require("@electron/remote/main").initialize();
const path = require("path");

let win;

function createWindow() {
	win = new BrowserWindow({
		width: 1024,
		height: 768,
		backgroundColor: "#000000",
		useContentSize: true,
		resizable: false,
		fullscreen: true,
		webPreferences: {
			contextIsolation: true,
			enableRemoteModule: true,
			nodeIntegration: true,
			preload: path.join(__dirname, "preload.js"),
		},
	});

	win.loadFile(`dist/sgc/index.html`);

	win.on("closed", function () {
		win = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
	app.quit();
});

app.on("activate", function () {
	if (win === null) {
		createWindow();
	}
});

const store = new Store();
ipcMain.handle("getStoreValue", (_, key) => store.get(key));
ipcMain.handle("setStoreValue", (_, key, value) => store.set(key, value));

try {
	require("electron-reloader")(module, { debug: true, ignore: ["build", "electron-build", "src"] });
} catch (_) {}
