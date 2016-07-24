import { INIT_DATABASE } from '../mutation-types'

const state = {
  mainDB: {}
}

const mutations = {
  [INIT_DATABASE] (state, db) {
    state.mainDB = db
    console.log(state.mainDB)
  }
}

export default {
  state,
  mutations
}
