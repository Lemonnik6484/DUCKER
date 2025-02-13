require('dotenv').config();

const { app, BrowserWindow, Menu, globalShortcut } = require('electron')
const path = require('path')
const remoteMain = require('@electron/remote/main');

remoteMain.initialize();

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 600,
        minHeight: 500,
        icon: path.join(__dirname, './assets/duck.png'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            enableRemoteModule: true,
            sandbox: false
        }
    })

    remoteMain.enable(mainWindow.webContents);
    mainWindow.loadFile('index.html')

    Menu.setApplicationMenu(null);

    globalShortcut.register('CommandOrControl+R', () => {
        if (mainWindow) {
            mainWindow.reload();
        }
    });

    globalShortcut.register('CommandOrControl+Shift+I', () => {
        if (mainWindow) {
            mainWindow.webContents.openDevTools();
        }
    });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});