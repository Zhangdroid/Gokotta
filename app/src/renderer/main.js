import Vue from 'vue'

import router from './router'
import store from './store'

import App from './App'

Vue.config.debug = true

const app = new Vue({
  router,
  store,
  ...App
})

app.$mount('#app')
