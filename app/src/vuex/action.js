import * as types from './mutation-types'

export const playSong = ({ dispatch, state }, song) => {
  dispatch(types.PLAY_SONG, song)
}
