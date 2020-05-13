const { app, BrowserWindow, ipcMain } = require("electron");
const Store = require("electron-store");

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
			nodeIntegration: true,
		},
	});

	win.loadFile(`dist/sgc/index.html`);

	win.on("closed", function() {
		win = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
	app.quit();
});

app.on("activate", function() {
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
