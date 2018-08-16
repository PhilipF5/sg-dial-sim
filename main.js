const { app, BrowserWindow } = require("electron");

let win;

function createWindow() {
	win = new BrowserWindow({
		width: 1024,
		height: 768,
		backgroundColor: "#000000",
		useContentSize: true,
		resizable: false,
	});

	win.loadURL(`http://localhost:4200`);

	win.on("closed", function() {
		win = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", function() {
	if (win === null) {
		createWindow();
	}
});
