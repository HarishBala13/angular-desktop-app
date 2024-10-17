const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname,'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // D:\IELEKTRON\angular-electron-tool-0.1/dist/angular-electron-tool-0.1/index.html
  mainWindow.loadURL(`file://${__dirname}/dist/angular-electron-tool-0.1/index.html`);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if(mainWindow == null) {
    createWindow();
  }
});

