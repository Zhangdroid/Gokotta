<template>
  <div class="container" v-if="setting.show">
    <div class="content">
      <span class="close" @click="close">×</span>
      <h2>Basic</h2>
      <label for="notification">enable notification</label>
      <input type="checkbox" id="notification" v-model="setting.notification">
    </div>
  </div>
</template>
<style scoped>
  .container {
    background: rgba(255,255,255,0.8);
    height: 60vh;
    width: 50vw;
    top: 20vh;
    left: 25vw;
    backdrop-filter: blur(3px);
    position: absolute;

  }
  .container::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    box-shadow: 0 0 30px rgba(0,0,0,0.2);
  }
  .content{
    position: absolute;
    z-index: 5;
  }
  .close{
    cursor: pointer;
  }
</style>
<script>
  import store from '../store';
  const {
    changeSetting
  } = store.actions;
  export default {
    methods: {
      close() {
        this.setting.show = false;
      }
    },
    computed: {
      setting() {
        return store.state.setting
      },
      color() {
        return store.state.playstate.color
      }
    }
  }
</script>
