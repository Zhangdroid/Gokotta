<style>

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'PingFang SC', sans-serif;
}

html {
    overflow: hidden;
}

body {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}

.app {
    width: 100vw;
    height: 100vh;
}

</style>

<template>

<div class="app">
    <router-view></router-view>
    <control-panel></control-panel>
    <setting></setting>
</div>

</template>

<script>

import initApp from '../init';
import ControlPanel from './ControlPanel.vue';
import Setting from './Setting.vue'
import store from '../store';
const remote = require('electron').remote;
const electronApp = remote.app;

export default {
    name: "App",
    ready() {
        initApp();
        electronApp.on('will-quit', () => {
            localStorage.setItem('currentList', JSON.stringify(this.currentList));
            localStorage.setItem('lastSong', JSON.stringify(this.playState.lastSong));
            localStorage.setItem('setting', JSON.stringify(this.setting));
            localStorage.setItem('color', this.playState.color);
        });
    },
    components: {
        ControlPanel,
        Setting
    },
    computed: {
        playState() {
                return store.state.playState
            },
            currentList() {
                return store.state.currentList
            },
            setting() {
                return store.state.setting
            }
    }
}

</script>
