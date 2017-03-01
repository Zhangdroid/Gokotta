import Vue from 'vue'
import router from './router'

import App from './App'

Vue.config.debug = true

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
