const { app, BrowserWindow } = require('electron')
const path = require('path')
const a = 123
console.log(a)

const createWindow = async ()=>{
    await app.whenReady()
    app.on('window-all-closed',()=>{
        app.quit()
    })
    const window = new BrowserWindow({
        width:800,
        height:600,
        webPreferences:{
            preload:path.join(__dirname,'./preload.js')
        }
    })
    window.loadFile('./index.html')
}

createWindow()
