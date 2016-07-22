import Vue from 'vue'
import Router from 'vue-router'

import App from './App'
import routes from './routes'

import { openDB } from './services/database'

(async () => {
  Vue.prototype.$db = await openDB()
})()

Vue.use(Router)
Vue.config.debug = true

const router = new Router()

router.map(routes)
router.beforeEach(() => {
  window.scrollTo(0, 0)
})
router.redirect({
  '*': '/'
})

router.start(App, 'app')
