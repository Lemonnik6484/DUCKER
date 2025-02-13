const { contextBridge } = require('electron')
const { BrowserWindow } = require('@electron/remote')

contextBridge.exposeInMainWorld('electronWindow', {
    minimize: () => BrowserWindow.getFocusedWindow().minimize(),
    toggleMaximize: () => {
        const win = BrowserWindow.getFocusedWindow()
        win.isMaximized() ? win.unmaximize() : win.maximize()
    },
    close: () => BrowserWindow.getFocusedWindow().close()
})