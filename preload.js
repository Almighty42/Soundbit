
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    reqFolder: () => ipcRenderer.send('request-data-folder', 'Requesting the data'),
    reqFile: () => ipcRenderer.send('request-data-file', 'Requesting the data'),
    minWindow: () => ipcRenderer.send('minimize'),
    maxWindow: () => ipcRenderer.send('maximize'),
    closeWindow: () => ipcRenderer.send('close'),
    asyncReply1: (arg) => ipcRenderer.on('asynchronous-reply1', (event, arg)),
    asyncReply2: (arg) => ipcRenderer.on('asynchronous-reply2', (event, arg)),
    invalidValue: (arg) => ipcRenderer.on('error - invalid file type', (event, arg))
})