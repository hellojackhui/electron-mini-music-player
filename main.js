const {app, BrowserWindow, ipcMain, dialog} = require('electron');

class AppWindow extends BrowserWindow {
  constructor(config, fileLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    }
    const finalConfig = {...basicConfig, ...config};
    super(finalConfig);
    this.loadFile(fileLocation);
    this.once('ready-to-show', () => {
      this.show();
    })
  }
}

// electron完全加载，创建BrowserWindow时触发
app.on('ready', () => {
   const mainWindow = new AppWindow({}, './renderer/index.html');
   ipcMain.on('add-music-window', (event, arg) => {
     const secondWindow = new AppWindow({
       width: 400,
       height: 300,
       parent: mainWindow,
     }, './renderer/add.html');
   })
   ipcMain.on('open-music-file', (event, arg) => {
     dialog.showOpenDialog({
       properties: ['openFile', 'multiSelections'],
       filters: [
         {
           name: 'music',
           extensions: ['mp3'],
         }
       ]
     }).then((files) => {
       if (files.filePaths.length > 0) {
         event.sender.send('selected-file', files.filePaths);
       }
     })
   })
}) 