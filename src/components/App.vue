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

  export default {
    name: "App",
    created() {
      initApp();
    },
    components: {
      ControlPanel,
    }
  }
</script>
