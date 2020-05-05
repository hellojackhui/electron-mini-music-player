const {ipcRenderer} = require('electron');
const {$} = require('./helper');
const path = require('path');
let musicFilesPath = [];

$('select-music').addEventListener('click', () => {
  ipcRenderer.send('open-music-file')
})


$('add-music').addEventListener('click', () => {
  ipcRenderer.send('add-tracks', musicFilesPath);
})


ipcRenderer.on('selected-file', (event, paths) => {
    if (Array.isArray(paths)) {
      renderFilePath(paths)
      musicFilesPath = paths;
    }
})

const renderFilePath = (pathes) => {
  const musicList = $('musicList');
  const musicListHtml = pathes.reduce((prev, music) => {
    return `${prev}<li class="list-group-item">${path.basename(music)}</li>`
  }, '');
  musicList.innerHTML = `<ul class="list-group">${musicListHtml}</ul>`;
}