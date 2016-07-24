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
