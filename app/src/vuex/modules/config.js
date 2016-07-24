import { CHANGE_MAIN_COLOR } from '../mutation-types'

const state = {
  styles: {
    mainColor: [255, 255, 255]
  }
}

const mutations = {
  [CHANGE_MAIN_COLOR] (state, color) {
    state.styles.mainColor = color
  }
}

export default {
  state,
  mutations
}
