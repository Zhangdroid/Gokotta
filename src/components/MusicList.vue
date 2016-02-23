<template>
  <div class="music-list-container">
    <header v-bind:style="{ background:playState.color }">
      <nav>
        <h1 id="library-button" @click="openLibrary" v-bind:class="{'active':playState.list === 'all'}">Library</h1>
        <h1 id="favorite-list-button" @click="openFavoriteList" v-bind:class="{'active':playState.list === 'favorite'}">Favorite</h1>
      </nav>
      <div class="control-button">
        <span id="add-button" @click="addSongs">+ ADD</span>
        <span id="play-all-button" @click="playAll">► PLAY ALL</span>
      </div>
    </header>
    <div id="empty" v-if="songs.length === 0">
      EMPTY
    </div>
    <div class="list-title" v-bind:style="{ color: playState.color }">
      <span class="list-title-title" @click="order = 'title'">Title</span>
      <span class="list-title-artist" @click="order = 'artist'">Artist</span>
      <span class="list-title-album" @click="order = 'album'">Album</span>
    </div>
    <ul class="list">
      <li v-if="playState.list === 'all' || song.favorite" class="list-item" v-for="song in songs  | orderBy order" track-by="id" transition="list-item" @dblclick="play(song)" @contextmenu="contextmenu(song)">
        <span v-if="song.id === playState.lastSong.id" class="play-signal" transition="play-signal" v-bind:style="{background:playState.color}"></span>
        <span v-else class="play-signal"></span>
        <span v-if="playState.list === 'all'" class="list-index" v-bind:style="{ color:playState.color,fontWeight:500,paddingLeft: '16px'}">{{ $index + 1 }}.</span>
        <span v-else class="list-index"></span>
        <span class="heart-container">
          <svg @click="favorite(song)" class="heart" v-bind:class="{favorite:song.favorite}" x="0px" y="0px" viewBox="0 0 64 64" xml:space="preserve">
            <path stroke-width="2" stroke-miterlimit="10" d="M1,21c0,20,31,38,31,38s31-18,31-38
	c0-8.285-6-16-15-16c-8.285,0-16,5.715-16,14c0-8.285-7.715-14-16-14C7,5,1,12.715,1,21z"/>
          </svg>
        </span>
        <span class="title">{{ song.title }}</span>
        <span class="artist">{{ song.artist }}</span>
        <span class="album">{{ song.album }}</span>
      </li>
    </ul>
  </div>
  <current-list :songs="songs"></current-list>
</template>
<style scoped>
  .music-list-container {
    position: fixed;
    top:0;
    bottom: 0;
    left: 0;
    right: 20vw;
    overflow-y: scroll;
    overflow-x: hidden;
    background: #eee;
    cursor: default;
  }
  header {
    position: fixed;
    z-index: 2;
    background: rgb(50,50,50);
    color: #fff;
    height: 80px;
    left: 0;
    right: 200px;
    backdrop-filter: blur(3px);
  }
  h1 {
    cursor: pointer;
    font-size: 16px;
    color: rgba(255,255,255,0.6);
    position: absolute;
    display: inline;
    font-weight: 100;
    bottom: 10px;
    transition: font-size .3s;
  }
  #library-button {
    left: 40px;
  }
  #favorite-list-button {
    left: 140px;
  }
  .active {
    font-size: 25px;
    color: #fff;
  }
  #empty {
    width: 100%;
    color: #aaa;
    font-weight: 800;
    font-size: 40px;
    position: absolute;
    top: 45%;
    text-align: center;
  }
  .control-button {
    text-align: right;
    position: absolute;
    bottom: 10px;
    right: 30px;
    font-size: 12px;
    font-weight: 200;
  }
  .control-button span {
    margin-left: 15px;
    cursor: pointer;
  }
  .list {
    width: 80vw;
    margin: 120px 0;
    font-size: 13px;
    list-style: none;
    -webkit-user-select:none;
  }
  .list-title {
    font-weight: 500;
    height: 40px;
    line-height: 40px;
    width: 100%;
    z-index: 2;
    backdrop-filter: blur(3px);
    position: fixed;
    top: 80px;
    font-size: 14px;
    cursor: pointer;
    background: rgba(255,255,255,0.2);
  }
  .list-title-title,.list-title-artist,.list-title-album {
    position: absolute;
  }
  .list-title-title {
    left: 20vw;
  }
  .list-title-artist {
    left: 45vw;
  }
  .list-title-album {
    left: 67vw;
  }
  .list-item {
    height: 30px;
    line-height: 30px;
  }
  .list-item-transition{
    transition: opacity .3s ease;
  }
  .list-item-enter {
    opacity: 0;
  }
  .list-item-leave {
    opacity: 0;
  }
  .list-item:nth-child(even) {
    background:rgba(220,220,220,0.4);
  }
  .list span {
    display: inline-block;
  }
  .play-signal {
    width: 0.5vw;
    height: 30px;
  }
  .play-signal-transition {
    transition: height .3s ease;
  }
  .play-signal-enter {
    height: 0;
  }
  .play-signal-leave {
    height: 0;
    position: absolute;
  }
  .list-index, .heart-container {
    position: relative;
    top: -10px;
  }
  .list-index {
    width: 4vw;
  }
  .heart-container {
    width: 1.7vw;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .heart {
    position: relative;
    top: 2px;
    width: 14px;
    height: 14px;
    fill: rgba(0,0,0,0);
    stroke: rgba(50,50,50,0.8);
    transition: fill .3s;
  }
  .favorite {
    fill: rgba(255,0,0,0.6);
    stroke: rgba(255,0,0,0.6);
  }
  .title,.artist,.album {
    padding-left: 10px;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space:nowrap;
  }
  .title {
    width: 30vw;
  }
  .artist {
    width: 20vw;
  }
  .album {
    width: 20vw;
  }
</style>
</template>
<script>
  import CurrentList from './CurrentList.vue'
	import {addSongs,getSongs,changeSong,deleteSong} from '../services/songs';
  import store from '../store';
  const {
    setPlaySongByID,
    addToCurrentList,
    addAllToCurrentList,
    deleteFromCurrentList
  } = store.actions;

  const remote = require('electron').remote;
  const Menu = remote.Menu;
  const MenuItem = remote.MenuItem;
	export default {
    data(){
      return{
        songs:[],
        added:1,
        order: 'title'
      }
    },
		components: {
      CurrentList
		},
		methods:{
      addSongs(){
        let self = this;
        addSongs().then(()=>{
          self.added++;
        });
      },
      play(song){
        setPlaySongByID(song.id);
        if(this.playState.currentList !== 'all') {
          this.playState.playAll = false;  
        }
        addToCurrentList(song.id);
      },
      playAll() {
        let self = this;
        let id = '';
        if (this.playState.list === 'all') {
          id = this.songs[0].id;
        } else if (this.playState.list === 'favorite') {
          let song = this.songs.find((song) => song.favorite);
          id = song.id;
        }
        setPlaySongByID(id);
        addAllToCurrentList(self.songs);
      },
      favorite(song){
        song.favorite = ! song.favorite;
        changeSong(song.id,'favorite',song.favorite);
      },
      delete(song) {
        deleteSong(song.id);
        deleteFromCurrentList(song.id);
        this.songs.$remove(song);
      },
      openLibrary() {
        this.playState.list = 'all';
      },
      openFavoriteList() {
        this.playState.list = 'favorite';
      },
      contextmenu(song) {
        let self = this;
        let menu = new Menu();
        menu.append(new MenuItem({ label: 'Play', click: function() { self.play(song) } }));
        menu.append(new MenuItem({ type: 'separator' }));
        menu.append(new MenuItem({ label: 'Delete', click: function() { self.delete(song) }}));
        menu.popup(remote.getCurrentWindow());
      }
		},
    asyncData() {
      return getSongs('AllSongs').then((songs)=>{
        return {
          songs:songs
        }
      })
    },
    watch: {
      added: 'reloadAsyncData'
    },
    computed:{
      playState(){
        return store.state.playState
      }
    }

	}
</script>
