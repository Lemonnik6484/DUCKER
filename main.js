require('dotenv').config();

const { app, BrowserWindow, Menu, globalShortcut, Tray } = require('electron')
const path = require('path')
const remoteMain = require('@electron/remote/main');

remoteMain.initialize();

let mainWindow = null;
let tray = null;

function createWindow() {
    mainWindow = new BrowserWindow({
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

    mainWindow.on('close', (event) => {
        if (!app.isQuiting) {
            event.preventDefault();
            mainWindow.hide();
        }
    });

    tray = new Tray(path.join(__dirname, './assets/duck.png'));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Открыть',
            click: () => {
                mainWindow.show();
            }
        },
        {
            label: 'Выход',
            click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ]);

    tray.setToolTip('У.Т.К.Э.Р.');
    tray.setContextMenu(contextMenu);

    tray.on('double-click', () => {
        mainWindow.show();
    });

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