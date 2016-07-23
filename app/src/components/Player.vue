<template>
  <div class="player">
    <img :src="cover" class="cover">
    {{ currentSong.title }}
  </div>
</template>

<script>
import encode from '../utils/encode'
export default {
  vuex: {
    getters: {
      currentSong: ({ song }) => song.currentSong
    }
  },
  computed: {
    cover () {
      if (this.currentSong.picture[0].data) {
        return `data:image/png;base64,${encode(this.currentSong.picture[0].data)}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.player {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 18vh;
  background-color: rgba(255, 255, 255, .8);
  backdrop-filter: blur(5px);
}
.cover {
  width: 18vh;
  height: 18vh;
}
</style>
