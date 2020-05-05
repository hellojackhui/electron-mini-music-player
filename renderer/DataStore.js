const Store = require('electron-store');
const uuid = require('uuid/v4');
const path = require('path');

class DataStore extends Store{
  constructor(settings) {
    super(settings);
    this.tracks = [];
  }
  saveTracks = () => {
    this.set('tracks', this.tracks);
    return this;
  }
  getTracks = () => {
    return this.get('tracks') || [];
  }
  addTracks = (tracks) => {
    const tracksWithProps = tracks.map((track) => {
      return {
        id: uuid(),
        path: track,
        filename: path.basename(track),
      }
    }).filter((track) => {
      const currentTrackPath = this.getTracks().map((track) => track.path);
      return currentTrackPath.indexOf(track.path) < 0;
    })
    this.tracks = [...this.tracks, ...tracksWithProps];
    return this.saveTracks();
  }
  deleteTracks = (id) => {
    this.tracks = this.tracks.filter((track) => track.id !== id);
    this.saveTracks(this.tracks); 
  }
}

module.exports = DataStore;