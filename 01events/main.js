const { app, BrowserWindow } = require('electron')
const path = require('path')

let mainWindow;

function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: { nodeIntegration: true, contextIsolation: false, preload: path.join(__dirname, 'preload.js') }
	});

	mainWindow.loadFile('index.html');
	mainWindow.on('closed', function() {
		mainWindow = null;
	});

	mainWindow.webContents.on('close', function () {})

	mainWindow.webContents.on('render-process-gone', function () {})

	// Emitted when the web page becomes unresponsive.
	mainWindow.on('unresponsive', function () {})

	// Emitted when the unresponsive web page becomes responsive again.
	mainWindow.on('responsive', function () {})

	// Catches errors and exception not handled in app.
	mainWindow.on('uncaughtException', function () {})

	// Emitted when window is maximized.
	mainWindow.on('maximize', function () {})

	// Emitted when the window exits from maximized state.
	mainWindow.on('minimize', function () {})

	// Emitted when the window is restored from minimized state.
	mainWindow.on('restore', function () {})

	// Emitted when the window is getting resized.
	mainWindow.on('resize', function () {})

	// Emitted when the window enters full screen state.
	mainWindow.on('enter-full-screen', function () {})

	// Emitted when the window leaves full screen state.
	mainWindow.on('leave-full-screen', function () {})
}

app.whenReady().then(() => {
	createMainWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
});