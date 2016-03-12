import Vue from 'vue'
import Vuex from 'vuex'

import encode from './services/encode'
import Vibrant from 'node-vibrant'
import {
  getSongByID,
  switchSong,
  getSongImageAndMainColor
} from './services/songs'

Vue.use(Vuex)

const SET_PLAY_SONG = 'SET_PLAY_SONG'
const ADD_TO_CURRENT_LIST = 'ADD_TO_CURRENT_LIST'
const ADD_ALL_TO_CURRENT_LIST = 'ADD_ALL_TO_CURRENT_LIST'
const DELETE_FROM_CURRENT_LIST = 'DELETE_FROM_CURRENT_LIST'
const DELETE_ALL_FROM_CURRENT_LIST = 'DELETE_ALL_FROM_CURRENT_LIST'
const CHANGE_SETTING = 'CHANGE_SETTING'
const CHANGE_DATABASE = 'CHANGE_DATABASE'
const RESET = 'RESET'


const INITPLAYSTATE = {
  lastSong: JSON.parse(localStorage.getItem("lastSong")) || {
    title: '',
    album: '',
    path: '',
    image: ''
  },
  duration: 0,
  currentTime: 0,
  isPlay: false,
  playAll: false,
  list: 'all',
  currentList: 'all',
  shuffle: false,
  color: localStorage.getItem("color") || ''
}
const INITSETTING = {
  show: false,
  notification: true
}

const state = {
  playState: INITPLAYSTATE,
  dbChange: false,
  folders: JSON.parse(localStorage.getItem("scannedFolder")) || [],
  currentList: JSON.parse(localStorage.getItem("currentList")) || [],
  setting: JSON.parse(localStorage.getItem("setting")) || INITSETTING
}

const actions = {
  addToCurrentList: ADD_TO_CURRENT_LIST,
  addAllToCurrentList: ADD_ALL_TO_CURRENT_LIST,
  deleteFromCurrentList: (store, id) => {
    let index = store.state.currentList.indexOf(id);
    if (index !== -1) {
      //while the removing song is current song
      if (id === store.state.playState.lastSong.id) {
        if (store.state.currentList.length !== 1) {
          let prevID = switchSong('prev', false, store.state.currentList, store.state.playState.lastSong.id);
          store.dispatch('SET_PLAY_SONG', prevID);
        }
      }
      store.dispatch('DELETE_FROM_CURRENT_LIST', index);
    }
  },
  deleteAllFromCurrentList: DELETE_ALL_FROM_CURRENT_LIST,
  setPlaySongByID: SET_PLAY_SONG,
  changeSetting: CHANGE_SETTING,
  changeDB: CHANGE_DATABASE,
  reset: RESET
}

const mutations = {
  SET_PLAY_SONG(state, id) {
    getSongByID(id).then((song) => {
      if (song.image) {
        let v = new Vibrant(song.image);
        v.getSwatches((error, swatches) => {
          let vibrant = swatches.Vibrant || swatches.DarkVibrant || swatches.DarkMuted || swatches.LightVibrant;
          let rgb = vibrant.rgb;
          for (let i = 0; i < 3; i++) {
            rgb[i] = Math.floor(rgb[i]);
          }
          let string = "rgba(" + rgb.join(",") + ",0.7)";
          state.playState.color = string;
        });
      }
      if(state.setting.notification) {
        new Notification(song.title, {
          body: song.artist,
          icon: song.image,
          silent: true
        });
      }
      state.playState.currentTime = 0;
      state.playState.lastSong = song;
      wavesurfer.load(song.path);
      wavesurfer.on('ready', function() {
        wavesurfer.play();
        state.playState.isPlay = true;
        state.playState.duration = parseInt(wavesurfer.getDuration());
      });
    });
  },
  ADD_TO_CURRENT_LIST(state, id) {
    if (!state.currentList.includes(id)) {
      state.currentList.push(id);
    }
  },
  ADD_ALL_TO_CURRENT_LIST(state, songs) {
    let list = [];
    state.playState.playAll = true;
    state.playState.currentList = state.playState.list;
    for(let song of songs.values()) {
      if (state.playState.currentList === 'all' || (state.playState.currentList === 'favorite' && song.favorite)) {
        list.push(song.id);
      }
    }
    state.currentList = list;
  },
  DELETE_FROM_CURRENT_LIST(state, index) {
    state.currentList.splice(index, 1);
    if (state.currentList.length === 0) {
      state.playState.isPlay = false;
      state.playState.duration = 0;
      state.playState.lastSong = {};
      wavesurfer.empty()
    }
  },
  DELETE_ALL_FROM_CURRENT_LIST(state) {
    state.currentList = [];
    state.playState.playAll = false;
    state.playState.isPlay = false;
    state.playState.duration = 0;
    state.playState.lastSong = {};
    wavesurfer.empty()
  },
  CHANGE_SETTING(state, item, value) {
    state.setting[item] = value;
  },
  CHANGE_DATABASE(state) {
    state.dbChange = !state.dbChange;
    state.folders = JSON.parse(localStorage.getItem("scannedFolder"));
  },
  RESET(state) {
    localStorage.setItem('currentList', '[]');
    localStorage.setItem('lastSong', '{}');
    wavesurfer.empty();
    state.playState = INITPLAYSTATE;
    state.currentList = [];
  }
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
