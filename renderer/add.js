const {ipcRenderer} = require('electron');
const {$} = require('./helper');
const path = require('path');

$('select-music').addEventListener('click', () => {
  ipcRenderer.send('open-music-file')
})

ipcRenderer.on('selected-file', (event, paths) => {
    if (Array.isArray(paths)) {
      renderFilePath(paths)
    }
})

const renderFilePath = (pathes) => {
  const musicList = $('musicList');
  const musicListHtml = pathes.reduce((prev, music) => {
    return `${prev}<li class="list-group-item">${path.basename(music)}</li>`
  }, '');
  musicList.innerHTML = `<ul class="list-group">${musicListHtml}</ul>`;
}