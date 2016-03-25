<style scoped>

.container {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    padding-bottom: 120px;
    width: 20vw;
    color: #fff;
    border-bottom: solid 1px rgba(220, 220, 220, 0.4);
    background: rgb(50, 50, 50);
    font-size: 14px;
    overflow-y: scroll;
}

h2 {
    position: fixed;
    z-index: 3;
    height: 80px;
    width: 20vw;
    line-height: 80px;
    text-align: center;
    transition: all .3s;
    font-weight: 200;
}

.h2-onscroll {
    backdrop-filter: blur(3px);
    height: 40px;
    line-height: 40px;
}

ul {
    padding-top: 80px;
    list-style: none;
    width: 20vw;
    overflow-x: hidden;
}

li {
    position: relative;
    left: 0;
    height: 100px;
    background-size: cover;
    background-position: center;
    color: #fff;
    transition: left .3s;
}

li:hover {
    left: -80px;
}

li::before {
    content: '';
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100px;
    background: rgba(0, 0, 0, 0.3);
}

.list-item-enter {
    opacity: 0;
}

.list-item-leave {
    opacity: 0;
    position: absolute;
}

.list-item-move {
    transition: transform .5s cubic-bezier(.55, 0, .1, 1);
}

.remove-all {
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    text-align: center;
}

#title,
#artist {
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
}

#title {
    padding: 0 10px;
    width: 20vw;
    height: 100px;
    line-height: 100px;
    text-align: center;
    z-index: 2;
    font-size: 16px;
    overflow-x: hidden;
    text-shadow: 0 0 5px #000;
}

#artist {
    font-weight: 200;
    font-size: 11px;
    right: 8px;
    bottom: 5px;
    color: rgba(255, 255, 255, 0.8);
}

#button-play,
#button-remove {
    font-weight: 100;
    font-size: 13px;
    cursor: pointer;
    position: absolute;
    left: 20vw;
    width: 80px;
    height: 50px;
    line-height: 50px;
    text-align: center;
}

#button-remove {
    border-top: solid 1px rgba(220, 220, 220, 0.4);
    top: 50px;
}

</style>

<template>

<div class="container" v-bind:style="{background: playState.color}" @scroll="getScrollTop">
    <h2 v-bind:style="{background: playState.color}" v-bind:class="{'h2-onscroll':!onTop}">QUEUE</h2>
    <ul>
        <li v-for="song in currentSongs" track-by="id" transition="list-item" v-bind:style="{backgroundImage: 'url(' + song.image + ')'}">
            <p id="title">{{song.title}}</p>
            <p id="artist">{{song.artist}}</p>
            <span id="button-play" @click="play(song.id)">PLAY</span>
            <span id="button-remove" @click="remove(song.id)">REMOVE</span>
        </li>
        <div v-if="currentSongs.length > 1" class="remove-all" @click="removeAll">Remove All</div>
    </ul>
</div>

</template>

<script>

import store from '../store';
import {
    getSongByID
}
from '../services/songs';
const {
    setPlaySongByID,
    deleteFromCurrentList,
    deleteAllFromCurrentList,
} = store.actions;
export default {
    name: 'CurrentList',
    props: ['songs'],
    data() {
        return {
            onTop: true
        }
    },
    methods: {
        getScrollTop(event) {
                event.target.scrollTop !== 0 ? this.onTop = false : this.onTop = true;
            },
            play(id) {
                setPlaySongByID(id);
            },
            remove(id) {
                deleteFromCurrentList(id);
            },
            removeAll() {
                deleteAllFromCurrentList();
            }
    },
    computed: {
        currentSongsList() {
                return store.state.currentList
            },
            playState() {
                return store.state.playState
            },
            currentSongs() {
                let songs = [];
                for (let i = 0; i < this.songs.length; i++) {
                    let index = this.currentSongsList.indexOf(this.songs[i].id);
                    if (index !== -1) {
                        songs[index] = this.songs[i];
                    }
                }
                return songs;
            }
    }
}

</script>
