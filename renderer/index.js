const {ipcRenderer} = require('electron');

document.getElementById('add-music-button').addEventListener('click', () => {
    console.log('click')
    ipcRenderer.send('add-music-window')
})