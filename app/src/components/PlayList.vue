<template>
  <div class="playlist">
    <span class="indicator" v-el:indicator></span>
    <ul>
      <li class="item" v-for="song in songs" @dblclick="play($event, song)">
        <div class="index">{{ $index + 1}}.</div>
        <div class="title">{{ song.title }}</div>
        <div class="artist">{{ song.artist }}</div>
        <div class="album">{{ song.album }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import anime from 'animejs'
import { getAllSongs } from '../services/database'
import { playSong } from '../vuex/action'
export default {
  data () {
    return {
      songs: {}
    }
  },
  vuex: {
    getters: {
      currentSong: ({ song }) => song.currentSong,
      database: ({ database }) => database.mainDB
    },
    actions: {
      playSong
    }
  },
  methods: {
    play (e, song) {
      this.playSong(song)
      anime({
        targets: this.$els.indicator,
        top: e.target.offsetTop
      })
    }
  },
  watch: {
    database () {
      if (this.database.name) {
        getAllSongs(this.database).then(songs => {
          this.songs = songs
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.playlist {
  position: relative;
  list-style: none;
  width: 100%;
  -webkit-user-select: none;
  cursor: default;
  overflow: hidden;
  .indicator {
    display: inline-block;
    width: 5px;
    height: 30px;
    background-color: #009688;
    position: absolute;
    left: 0;
    top: 0;
  }
  .item {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-weight: 200;
    display: flex;
    justify-content: space-between;
    &:nth-child(even) {
      background: rgba(220, 220, 220, 0.2);
    }
    .index, .title, .artist, .album {
      display: inline-block;
      overflow: hidden;
    }
    .index {
      padding-left: 15px;
      width: 35px;
      flex-shrink: 0;
    }
    .title {
      width: 30%;
    }
    .artist {
      width: 20%;
    }
    .album {
      width: 40%;
    }
  }
}
</style>
