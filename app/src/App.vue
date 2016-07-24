<template>
  <div class="app">
    <toolbar></toolbar>
    <sidebar></sidebar>
    <router-view></router-view>
    <player></player>
  </div>
</template>

<script>
import store from './vuex/store'
import { initDatabase } from './vuex/action'

import toolbar from './components/Toolbar.vue'
import sidebar from './components/Sidebar.vue'
import player from './components/Player.vue'
export default {
  store,
  components: {
    toolbar,
    sidebar,
    player
  },
  vuex: {
    actions: {
      initDatabase
    }
  },
  created () {
    this.initDatabase()
  }
}
</script>

<style src="./styles/main.scss"></style>
<style lang="scss" scoped>
.app {
  margin: 0 18vw;
}
</style>
