<template>
  <div class="home">
    <file-selector></file-selector>
    <play-list></play-list>
  </div>
</template>

<script>
import FileSelector from '../components/FileSelector.vue'
import PlayList from '../components/PlayList.vue'
export default {
  components: {
    FileSelector,
    PlayList
  }
}
</script>

<style lang="scss" scoped>
@import "../styles/variables";
.home {
  position: fixed;
  top: 0;
  bottom: 0;
  left: $sidebar-width;
  right: 0;
  padding-top: $toolbar-height;
  padding-bottom: $player-height;
  overflow-y: scroll;
}
</style>
