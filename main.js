const { app, BrowserWindow, ipcMain } = require("electron");
const Store = require("electron-store");
const remote = require("@electron/remote/main");
const package = require("./package.json");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

let win;
remote.initialize();

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

	remote.enable(win.webContents);

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

const store = new Store({
	migrations: {
		"~0.2.1": (store) => {
			const setsFromStorage = store.get("addressSets");
			let id = 1;
			setsFromStorage?.forEach((set) => {
				set.destinations?.forEach((dest) => {
					dest.id = id++;
				});
			});
		},
		">=0.3.0-pre": (store) => {
			const setsFromStorage = store.get("addressSets");
			setsFromStorage?.forEach((set) => {
				set.destinations?.forEach((dest) => {
					dest.id = uuidv4();
				});
			});
		},
	},
});
ipcMain.handle("getStoreValue", (_, key) => store.get(key));
ipcMain.handle("setStoreValue", (_, key, value) => store.set(key, value));

try {
	require("electron-reloader")(module, { debug: true, ignore: ["build", "electron-build", "src"] });
} catch (_) {}
