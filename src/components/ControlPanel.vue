<style scoped>

#container {
    color: #fff;
    position: fixed;
    bottom: 0;
    height: 120px;
    width: 100%;
    background: rgb(50, 50, 50);
    transition: background 1s;
    backdrop-filter: blur(3px);
}

img {
    width: 120px;
    height: 120px;
}

#waveform {
    position: fixed;
    height: 40px;
    bottom: 0;
    left: 120px;
    right: 0;
}

.content {
    position: absolute;
    padding: 15px;
    left: 120px;
    right: 0;
    top: 0;
    bottom: 0;
}

#title {
    display: block;
    font-size: 16px;
    width: 30vh;
    font-weight: 300;
    margin-bottom: 10px;
}

#artist {
    display: block;
    font-weight: 100;
    font-size: 13px;
    width: 30vh;
}

#duration {
    position: absolute;
    font-size: 12px;
    font-weight: 100;
    color: rgba(255, 255, 255, 0.6);
    right: 35px;
    top: 50px;
}

.control-button {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
}

#play-button-container {
    box-sizing: content-box;
    display: inline-block;
    width: 25px;
    height: 25px;
    cursor: pointer;
}

.play-button {
    display: inline-block;
    position: absolute;
    width: 25px;
    height: 25px;
    background: #fff;
    transition: clip-path .3s;
}

.play-button-before {
    clip-path: polygon(0 0, 50% 25%, 50% 75%, 0% 100%);
}

.play-button-after {
    clip-path: polygon(50% 25%, 100% 50%, 100% 50%, 50% 75%);
}

.pause-button-before {
    clip-path: polygon(0 0, 30% 0, 30% 100%, 0% 100%);
}

.pause-button-after {
    clip-path: polygon(70% 0, 100% 0, 100% 100%, 70% 100%)
}

#prev-button-container,
#next-button-container {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin: 0 35px;
    cursor: pointer;
}

#prev-button,
#next-button {
    fill: rgba(255, 255, 255, 0.7);
    width: 40px;
    height: 40px;
    transition: fill .3s;
}

#prev-button:hover,
#next-button:hover {
    fill: #fff;
}

#shuffle-button-container {
    cursor: pointer;
    position: absolute;
    z-index: 2;
    right: 35px;
    top: 18px;
}

.shuffle-button {
    width: 20px;
    height: 20px;
    fill: none;
    stroke: rgba(255, 255, 255, 0.6);
    stroke-width: 2;
    transition: stroke .3s;
}

.shuffle {
    stroke: #fff;
    stroke-width: 4;
}

</style>

<template>

<div id="container" v-bind:style="{ background: playState.color }">
    <img v-if="playState.lastSong.image" src="{{ playState.lastSong.image }}" alt="" />
    <img v-else src="../assets/images/logo.png" alt="" />
    <div class="content">
        <span id="title">{{ playState.lastSong.title }}</span>
        <span id="artist">{{ playState.lastSong.artist }}</span>
        <span id="duration">{{ parseInt(playState.currentTime / 60) }}:{{ playState.currentTime % 60 >= 10 ? playState.currentTime % 60 : '0' + playState.currentTime % 60}} / {{ parseInt(playState.duration / 60) }}:{{ playState.duration % 60 >= 10 ? playState.duration % 60 : '0' + playState.duration % 60}}</span>
    </div>
    <div class="control-button">
        <span id="prev-button-container" @click="prev">
            <svg id="prev-button" x="0px" y="0px" viewBox="0 0 64 64" xml:space="preserve">
              <g>
                <path d="M13,31.214v1.572l14.191,11L29,43V21l-1.809-0.786L13,31.214z M27,40.942L15.619,32L27,23.058V40.942z"/>
                <path d="M33,31.214v1.572l14.191,11L49,43V21l-1.809-0.786L33,31.214z M47,40.942L35.619,32L47,23.058V40.942z"/>
              </g>
            </svg>
          </span>
        <span id="play-button-container" @click="play">
            <span class="play-button play-button-before" v-bind:class="{'pause-button-before':playState.isPlay}"></span>
        <span class="play-button play-button-after" v-bind:class="{'pause-button-after':playState.isPlay}"></span>
        </span>
        <span id="next-button-container" @click="next">
            <svg id="next-button" x="0px" y="0px" viewBox="0 0 64 64" xml:space="preserve">
              <path d="M35,21v22l1.809,0.786l14.191-11v-1.572l-14.191-11L35,21z M37,23.058L48.382,32L37,40.942V23.058z"/>
              <path d="M15,21v22l1.809,0.786l14.191-11v-1.572l-14.191-11L15,21z M17,23.058L28.382,32L17,40.942V23.058z"/>
            </svg>
          </span>
    </div>
    <div id="shuffle-button-container" @click="shuffle">
        <svg class="shuffle-button" v-bind:class="{shuffle: isShuffle}" x="0px" y="0px" viewBox="0 0 64 64" xml:space="preserve">
            <polyline stroke-miterlimit="10" points="0,48 15,48 47,16 63,16 " />
            <polyline stroke-miterlimit="10" points="37,38 47,48 63,48 " />
            <polyline stroke-miterlimit="10" points="0,16 15,16 25,26 " />
            <path stroke-linejoin="bevel" stroke-miterlimit="10" d="M56,23" />
            <polyline stroke-linejoin="bevel" stroke-miterlimit="10" points="56,23 63,16 56,9
          " />
            <polyline stroke-linejoin="bevel" stroke-miterlimit="10" points="56,55 63,48
          56,41 " />
        </svg>
    </div>
    <div id="waveform"></div>
</div>

</template>

<script>

import store from '../store';
import WaveSurfer from '../services/wavesurfer.cjs';
import {
    switchSong
}
from '../services/songs'
const {
    setPlaySongByID
} = store.actions;
const remote = require('electron').remote;
const globalShortcut = remote.globalShortcut;
export default {
    name: "ControlPanel",
    data() {
        return {
            color: '',
            isShuffle: false
        }
    },
    ready() {
        let self = this;
        window.wavesurfer = WaveSurfer.create({
            container: '#waveform',
            scrollParent: false,
            height: 80,
            cursorColor: '#fff',
            waveColor: 'rgba(255,255,255,0.5)',
            progressColor: 'rgba(255,255,255,0.8)',
        });
        wavesurfer.load(store.state.playState.lastSong.path);
        wavesurfer.on('ready', () => {
            store.state.playState.duration = parseInt(wavesurfer.getDuration());
        });
        wavesurfer.on('seek', () => {
            store.state.playState.currentTime = parseInt(wavesurfer.getCurrentTime());
        })
        wavesurfer.on('finish', () => {
            self.next();
        });
        setInterval(function() {
            if (self.playState.isPlay) {
                store.state.playState.currentTime++;
            }
        }, 1000);
        let playShortcut = globalShortcut.register('MediaPlayPause', () => {
            self.play();
        });
        let nextShortcut = globalShortcut.register('MediaNextTrack', () => {
            self.next();
        });
        let prevShortcut = globalShortcut.register('MediaPreviousTrack', () => {
            self.prev();
        });
    },
    methods: {
        play() {
                wavesurfer.playPause();
                this.playState.isPlay = !this.playState.isPlay;
            },
            prev() {
                let self = this;
                let songID = switchSong('prev', self.isShuffle, self.currentList, self.playState.lastSong.id);
                setPlaySongByID(songID);
            },
            next() {
                let self = this;
                let songID = switchSong('next', self.isShuffle, self.currentList, self.playState.lastSong.id);
                setPlaySongByID(songID);
            },
            shuffle() {
                this.isShuffle = !this.isShuffle;
            }
    },
    computed: {
        playState() {
                return store.state.playState
            },
            currentList() {
                return store.state.currentList
            }
    }
}

</script>
