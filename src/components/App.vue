<template>
  <div class="app">
    <router-view></router-view>
    <control-panel></control-panel>
  </div>
</template>
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'PingFang SC',sans-serif;
  }
  .app {
    width: 100vw;
    height: 100vh;
  }
</style>
<script>
  import initApp from '../init';
  import ControlPanel from './ControlPanel.vue';
  import store from '../store';
  const remote = require('electron').remote;
  const electronApp = remote.app;

  export default {
    name: "App",
    ready() {
      initApp();
      electronApp.on('will-quit',() => {
        localStorage.setItem('currentList', JSON.stringify(this.currentList));
        localStorage.setItem('lastSong', JSON.stringify(this.playState.lastSong));
        localStorage.setItem('color', this.playState.color);
      });
    },
    components: {
      ControlPanel,
    },
    computed:{
      playState() {
        return store.state.playState
      },
      currentList() {
        return store.state.currentList
      }
    }
  }
</script>
