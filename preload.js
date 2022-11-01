const {contextBridge,ipcRenderer  } = require('electron')
const url = require('url')
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
    const counter = document.getElementById('counter')
    ipcRenderer.on('update-counter',(_event, value)=>{
        const oldValue = Number(counter.innerText)
        const newValue = oldValue + value
        counter.innerText = newValue
    })
})
contextBridge.exposeInMainWorld('myApi',{
    changeTitle:(title)=>{
        ipcRenderer.send('set-title',title)
    },
})
