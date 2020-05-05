const {ipcRenderer} = require('electron');
const { $ } = require('./helper');
let musicAudio = new Audio();
let allTracks;
let currentTrack;

$('add-music-button').addEventListener('click', () => {
    ipcRenderer.send('add-music-window')
})

$('trackList').addEventListener('click', (e) => {
  e.preventDefault();
  const {dataset, classList} = e.target;
  const id = dataset && dataset.id;
  if (id && classList.contains('fa-play')) {
    if (currentTrack && id === currentTrack.id) {
      musicAudio.play();
    } else {
        currentTrack = allTracks.find((item) => id === item.id);
        musicAudio.src = currentTrack.path;
        musicAudio.play();
        const resetIconEle = document.querySelector('.fa-pause');
        if (resetIconEle) {
          resetIconEle.classList.replace('fa-pause', 'fa-play');
        }
    }
    classList.replace('fa-play', 'fa-pause');
  } else if (id && classList.contains('fa-pause')) {
    musicAudio.pause();
    classList.replace('fa-pause', 'fa-play');
  } else if (id && classList.contains('fa-trash')) {
    ipcRenderer.send('delete-track', id);
  }
})


ipcRenderer.on('getTracks', (event, tracks) => {
   allTracks = tracks;
   renderTrackListHtml(tracks);
})

const renderTrackListHtml = (tracks) => {
  console.log(tracks);
  const trackListDOM = $('trackList');
  const trackListHTML = tracks.reduce((prev, track) => {
    return `${prev}<li class="row music-track list-group-item d-flex justify-content-between align-item-center">
      <div class="col-10">
        <i class="fa fa-music mr-2"></i>
        <b>${track.filename}</b>
      </div>
      <div class="col-2">
        <i class="fa fa-play mr-3" data-id="${track.id}"></i>
        <i class="fa fa-trash" data-id="${track.id}"></i>
      </div>
    </li>`
  }, '');
  const emptyHTML = '<div class="alert alert-primary">还没有添加任何音乐</div>';
  trackListDOM.innerHTML = tracks.length > 0 ? `<ul class="list-group">${trackListHTML}</ul>` : emptyHTML;
};

