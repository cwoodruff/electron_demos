/* eslint-disable no-undef */
// Modules to control application life and create native browser window
const { shell, Notification } = require('electron')
const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

/**
 * Boolean indicating if the app is running in production mode.
 * Set based on the NODE_ENV environment variable.
*/
// eslint-disable-next-line no-unused-vars
const isProd = process.env.NODE_ENV === 'production'

/**
 * Creates the main browser window for the application.
 * Configures the window size, properties, web preferences etc.
 * Also handles logic for opening dev tools and loading the index.html.
 */
function createMainWindow() {
  /**
   * Creates the main browser window for the application.
   * Configures the window size, properties, web preferences etc.
   */
  const mainWindow = new BrowserWindow({
    webPreferences: {
      webviewTag: true
    },
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: true
  })

  // open developer console in dev mode
  isProd ? null : mainWindow.webContents.openDevTools()

  /** Path to the index.html file that will be loaded into the main browser window. */
  const indexPath = path.join(__dirname, 'pages', 'index.html')

  // and load the index.html of the app.
  mainWindow.loadFile(indexPath)

  // if main window is closed then quit application
  mainWindow.on('closed', () => app.quit())
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createMainWindow()
  showNotification()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

/**
 * Opens a new browser window when the 'open-new-window' IPC message is received.
 * Configures the new window properties like width, height etc.
 * Loads the GitHub URL for this sample app.
 * IpcMain Documentation: https://www.electronjs.org/docs/latest/tutorial/ipc
 * -----------
 * Inter-process communication (IPC) is a key part of building feature-rich desktop applications in Electron. 
 * Because the main and renderer processes have different responsibilities in Electron's process model,
 * IPC is the only way to perform many common tasks, such as calling a native API from your UI or 
 * triggering changes in your web contents from native menus.
 */
ipcMain.on("open-new-window", () => {
  const url = "https://github.com/sametcn99/electron-quick-start";
  // open url in default web browser
  // The shell module provides functions related to desktop integration.
  // Shell documentation: https://www.electronjs.org/docs/latest/api/shell
  shell.openExternal(url);
})


/**
 * Shows a system notification to indicate the app is ready.
 * Defines the notification title and body text constants.
 * Creates a new Notification instance with the title and body text,
 * and calls the show() method to display it.
 * Documentation: https://www.electronjs.org/docs/latest/tutorial/notifications
 */
const NOTIFICATION_TITLE = "Application is ready";
const NOTIFICATION_BODY = "Notification from the Main process";
function showNotification() {
  new Notification({
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
  }).show();
}
