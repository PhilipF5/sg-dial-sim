const { app, BrowserWindow } = require("electron");

let win;

function createWindow() {
	win = new BrowserWindow({
		width: 1024,
		height: 768,
		backgroundColor: "#000000",
		useContentSize: true,
		resizable: false,
		fullscreen: true,
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

try {
	require("electron-reloader")(module, { debug: true, ignore: ["build", "electron-build", "src"] });
} catch (_) {}
