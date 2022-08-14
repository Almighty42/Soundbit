
const { app, BrowserWindow, ipcMain, dialog, protocol, session } = require('electron')

var fs = require('fs');
const mm = require('music-metadata');
const util = require('util');

const path = require('path')

function createWindow() {
  const mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    /* icon: __dirname+'/src/SoundBitIcon.png', */
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      preload: __dirname+'/preload.js',
      contextIsolation: false,
      partition: true,
      webSecurity:true
    }
  })

  mainWindow.loadURL(`file://${path.join(__dirname, '/build/index.html')}`)
  /* mainWindow.webContents.openDevTools() */

  ipcMain.on('minimize', () => {
    mainWindow.minimize()
  })
  ipcMain.on('maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })
  ipcMain.on('close', () => {
    mainWindow.close()
  })
  ipcMain.on('request-data-folder', (event, arg) => {
    dialog
      .showOpenDialog({
        properties: [
          'openDirectory'
        ]
      })
      .then(result => {
        if (!result.canceled) {
          console.log(result)
          fs.readdir(
            result.filePaths[0],
            { withFileTypes: true },
            (err, files) => {
              if (err) {
                event.reply('asynchronous-reply', [
                  result.canceled,
                  result.filePaths,
                ])
              }
              if (files[0]) {
                var url = result.filePaths
                let prefix = result.filePaths + '/'
                let newSongs = files.map((s) => {
                  return [s.name.split('.')[0], prefix + s.name]
                })

                var songsUrlData = []
                var songsUrlData2 = []
                var songsNameData = []
                var songsMetadata = []

                newSongs.map((song) => {
                  songsUrlData.push(song[1])
                  songsUrlData2.push(song[1])
                  songsNameData.push(song[0])
                })

                parseFiles = (audioFiles) => {

                  const audioFile = audioFiles.shift();

                  if (audioFile) {
                    return mm.parseFile(audioFile, { duration:true } ).then(metadata => {
                      songsMetadata.push(metadata)
                      return parseFiles(audioFiles); 
                    })
                  }                

                  return Promise.resolve('Success').then(() => {
                    event.sender.send('asynchronous-reply', { path: songsUrlData2, other: [ false , '' , songsNameData, songsMetadata, newSongs ] } /* [false, songsUrlData2, songsNameData, songsMetadata, newSongs] */)
                  }).catch(function(err) {
                    console.log('error: ', err);
                })
                }
                parseFiles(songsUrlData)
              }
              
            },
          )
        } else {
          event.reply('asynchronous-reply', [result.canceled, result.filePaths])
        }
      }).catch(err => {
        console.log(err)
      })
  })
  ipcMain.on('request-data-file', (event,arg) => {
    dialog
      .showOpenDialog({
        properties: [
          'openFile'
        ]
      })
      .then(result => {
        if (!result.canceled) {
          console.log(result.filePaths[0])
          event.reply()
        } else {
          event.reply('asynchronous-reply', [result.canceled, result.filePaths])
        }
      }).catch(err => {
        console.log(err)
      })
  })

}

/* protocol.registerSchemesAsPrivileged([
  { scheme: 'customProtocol', privileges: { bypassCSP: true } }
]) */

/* app.on('ready', async () => {

  const partition = 'persist:example'
  const ses = session.fromPartition(partition)

  ses.protocol.registerFileProtocol('customProtocol', (request, callback) => {
    const url = request.url.replace(`customProtocol://`, '')
    try {
      return callback(decodeURIComponent(url))
    }
    catch (error) {
      // Handle the error as needed
      console.error('ERROR: registerLocalResourceProtocol: Could not get file path:', error)
    }
  })
}) */

app.whenReady().then(() => {

  app.commandLine.appendSwitch('enable-transparent-visuals');
  app.commandLine.appendSwitch('disable-gpu');

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})