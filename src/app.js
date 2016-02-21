import "babel-polyfill"
import Vue from 'vue'
import Router from 'vue-router'
import VueAsyncData from 'vue-async-data'
import VueAnimatedList from 'vue-animated-list'

import App from './components/App.vue'
import Home from './components/Home.vue'

// Install plugins
Vue.use(Router)
Vue.use(VueAsyncData)
Vue.use(VueAnimatedList)
// Set up a new router
var router = new Router()

// Route config
router.map({
  '/home':{
    name: 'home',
    component: Home,
  }
})

// For every new route scroll to the top of the page
router.beforeEach(function () {
  window.scrollTo(0, 0)
})

// If no route is matched redirect home
router.redirect({
  '*': '/home'
})

// Start up our app
router.start(App, '#app');

if(module.hot) {
    module.hot.accept();
}
