<style scoped>

.setting-transition {
    transition: all .3s ease;
    transform: scale(1);
}

.setting-enter {
    opacity: 0;
    transform: scale(0);
}

.setting-leave {
    opacity: 0;
    transform: scale(0);
}

.container {
    background: rgba(255, 255, 255, 0.8);
    height: 60vh;
    width: 50vw;
    top: 20vh;
    left: 25vw;
    backdrop-filter: blur(3px);
    position: absolute;
}

.content {
    padding: 20px;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 5;
}

.close {
    cursor: pointer;
    position: absolute;
    right: 15px;
    top: 15px;
}

h2 {
    padding-left: 8px;
}

ul {
    list-style: none;
    margin: 15px;
    font-size: 14px;
}

li {
    height: 30px;
    line-height: 30px;
}

#folder-list {
    margin: -5px 0 0 15px;
    font-size: 12px;
}

.delete-button {
    cursor: pointer;
    border: 1px solid;
    border-radius: 5px;
    font-size: 9px;
    padding: 1.5px 3px;
    margin-left: 5px;
}

input[type=checkbox] {
    display: none;
}

.check-box {
    height: 16px;
    width: 16px;
    margin-left: 10px;
    background-color: transparent;
    border: 1.6px solid rgba(50, 50, 50, 0.3);
    border-radius: 5px;
    position: relative;
    display: inline-block;
    transition: border-color ease 0.2s;
    cursor: pointer;
}

.check-box::before,
.check-box::after {
    position: absolute;
    height: 0;
    width: 3px;
    background-color: rgb(50, 50, 50);
    display: inline-block;
    transform-origin: left top;
    border-radius: 5px;
    content: ' ';
    transition: opacity ease .5s;
}

.check-box::before {
    top: 10.52px;
    left: 7.56px;
    transform: rotate(-135deg);
}

.check-box::after {
    top: 5.92px;
    left: 0.8px;
    transform: rotate(-45deg);
}

input[type=checkbox]:checked + .check-box,
.check-box.checked {
    border-color: rgba(50, 50, 50, 0.8);
}

input[type=checkbox]:checked + .check-box::after,
.check-box.checked::after {
    height: 8px;
    animation: dothabottomcheck 0.2s ease 0s forwards;
}

input[type=checkbox]:checked + .check-box::before,
.check-box.checked::before {
    height: 19.2px;
    animation: dothatopcheck 0.4s ease 0s forwards;
}

@keyframes dothabottomcheck {
    0% {
        height: 0;
    }
    100% {
        height: 8px;
    }
}

@keyframes dothatopcheck {
    0% {
        height: 0;
    }
    50% {
        height: 0;
    }
    100% {
        height: 19.2px;
    }
}

</style>

<template>

<div class="container" v-if="setting.show" transition="setting">
    <div class="content">
        <span class="close" v-bind:style="{color:color}" @click="close">×</span>
        <h2 v-bind:style="{'border-left':'solid 4px ' + color}">Basic</h2>
        <ul>
            <li>
                <span>Enable notification</span>
                <input type="checkbox" id="notification" v-model="setting.notification" />
                <label for="notification" class="check-box"></label>
            </li>
            <li>
                <span v-if="folders.length !== 0">Folder:</span>
                <ul id="folder-list">
                    <li v-for="folder in folders">
                        {{folder}} <span class="delete-button" v-bind:style="{color:color}" @click="deleteFolder(folder)">Remove</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>

</template>

<script>

import store from '../store';
import {
    deleteSongByFolder
}
from '../services/songs';
const {
    changeSetting,
    changeDB,
    reset
} = store.actions;
export default {
    data() {
            return {}
        },
        methods: {
            close() {
                    this.setting.show = false;
                },
                deleteFolder(folder) {
                    this.folders.$remove(folder);
                    localStorage.setItem("scannedFolder", JSON.stringify(this.folders));
                    deleteSongByFolder(folder).then(() => {
                        changeDB()
                    });
                    reset();
                }
        },
        computed: {
            setting() {
                    return store.state.setting
                },
                color() {
                    return store.state.playState.color
                },
                dbChange() {
                    return store.state.dbChange
                },
                folders() {
                    return store.state.folders
                }
        },
        watch: {
            dbChange() {
                this.folders = JSON.parse(localStorage.getItem("scannedFolder"));
            }
        },
}

</script>
