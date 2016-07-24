import * as types from './mutation-types'


import { openDB } from '../services/database'

export const playSong = ({ dispatch, state }, song) => {
  dispatch(types.PLAY_SONG, song)
}

export const initDatabase = ({ dispatch, state }) => {
  openDB().then(database => {
    dispatch(types.INIT_DATABASE, database)
  })
}
