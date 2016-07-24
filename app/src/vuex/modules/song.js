import { PLAY_SONG } from '../mutation-types'

const state = {
  currentSong: {}
}

const mutations = {
  [PLAY_SONG] (state, song) {
    state.currentSong = song
  }
}

export default {
  state,
  mutations
}
