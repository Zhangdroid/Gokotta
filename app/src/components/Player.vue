<template>
  <div class="player">
    <img :src="currentSong.cover" class="cover">
    {{ currentSong.title }}
  </div>
</template>

<script>
export default {
  vuex: {
    getters: {
      currentSong: ({ song }) => song.currentSong
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";
.player {
  position: fixed;
  z-index: $player-zindex;
  bottom: 0;
  left: 0;
  width: 100%;
  height: $player-height;
  background-color: rgba(255, 255, 255, .8);
  backdrop-filter: blur(5px);
}
.cover {
  width: 18vh;
  height: 18vh;
}
</style>
