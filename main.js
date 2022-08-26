// Electron
const { app, BrowserWindow, ipcMain, dialog, session, protocol } = require('electron')
// Other
var fs = require('fs');
const mm = require('music-metadata');
const path = require('path')

function createWindow() {
  const mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js',
      contextIsolation: true,
      partition: true,
      webSecurity: true
    }
  })

  mainWindow.loadURL(`file://${path.join(__dirname, '/build/index.html')}`)

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
  // ipcMain when user wants to import a folder
  ipcMain.on('request-data-folder', (event, arg) => {
    dialog
      .showOpenDialog({
        properties: [
          'openDirectory'
        ],
      })
      .then(result => {
        if (!result.canceled) {
          fs.readdir(
            result.filePaths[0],
            { withFileTypes: true },
            (err, files) => {
              if (err) {
                event.reply('asynchronous-reply1', [
                  result.canceled,
                  result.filePaths,
                ])
              }
              // Sort out files that are in invalid form
              var acceptedFiles = []
              files.map((file) => {
                if (file.name.includes('.mp3') || file.name.includes('.wav') || file.name.includes('.ogg')) {
                  acceptedFiles.push({ name: file.name })
                }
              })
              if (files[0]) {
                let prefix = result.filePaths + '/'
                let newSongs = acceptedFiles.map((song) => {
                  return [song.name.split('.')[0], prefix + song.name]
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
                    return mm.parseFile(audioFile, { duration: true }).then(metadata => {
                      songsMetadata.push(metadata)
                      return parseFiles(audioFiles);
                    })
                  }

                  return Promise.resolve('Success').then(() => {
                    event.sender.send('asynchronous-reply1', { path: songsUrlData2, other: [false, '', songsNameData, songsMetadata, newSongs] })
                  }).catch(function (err) {
                    console.log('catch error: ', err);
                  })
                }
                parseFiles(songsUrlData)
              }

            },
          )
        } else {
          event.reply('asynchronous-reply1', [result.canceled, result.filePaths])
        }
      }).catch(err => {
        console.log(err)
      })
  })
  // ipcMain when user wants to import a file
  ipcMain.on('request-data-file', (event, arg) => {
    dialog
      .showOpenDialog({
        properties: [
          'openFile'
        ],
        filters: [
          { name: 'Audio', extensions: ['mp3', 'wav', 'ogg'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      })
      .then(result => {
        if (!result.canceled) {
          let fileURL = result.filePaths[0]
          // Check if file is in valid form, if not throw error in frontend
          if (fileURL.includes(".mp3") || fileURL.includes(".wav") || fileURL.includes(".ogg")) {
            let fileName = path.parse(result.filePaths[0]).name

            parseOneFile = (audioFile) => {

              if (audioFile) {
                return mm.parseFile(audioFile).then(metadata => {
                  event.sender.send('asynchronous-reply2', { path: fileURL, other: [false, '', fileName, metadata] })
                })
              }
            }

            parseOneFile(fileURL)
          } else {
            event.reply('error - invalid file type', fileURL)
          }
        } else {
          event.reply('asynchronous-reply2', [result.canceled, result.filePaths])
        }
      }).catch(err => {
        console.log("Warning ERROR : " + err)
      })
  })

}
app.whenReady().then(() => {

  /* session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': ['default-src \'none\' \'unsafe-inline\' data: filesystem:']
      }
    })
  }) */

  protocol.registerFileProtocol('my-magic-protocol', (request, callback) => {
    const url = request.url.replace('my-magic-protocol://getMediaFile/', '')
    try {
      return callback(url)
    }
    catch (error) {
      console.error(error)
      return callback(404)
    }
  })

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