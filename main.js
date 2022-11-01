const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const path = require('path')

const createWindow = async () => {
    await app.whenReady()
    app.on('window-all-closed', () => {
        app.quit()
    })
    ipcMain.on('set-title', (event, title) => {
        const webContext = event.sender
        const win = BrowserWindow.fromWebContents(webContext)
        win.setTitle(title)
    })

    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, './preload.js')
        }
    })
    const menu = Menu.buildFromTemplate([
        {
            label: app.name,
            submenu: [
                {
                    click: () => {
                        window.webContents.send('update-counter', 1)
                    },
                    label: 'Increment'
                },
                {
                    click: () => {
                        window.webContents.send('update-counter', -1)
                    },
                    label: 'Decrement',
                }
            ]
        }
    ])
    Menu.setApplicationMenu(menu)
    window.loadFile('./index.html')
    window.webContents.openDevTools()
}

createWindow()
