<template>
  <div class="sidebar"></div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../styles/variables";
.sidebar {
  position: fixed;
  z-index: $sidebar-zindex;
  top: $toolbar-height;
  bottom: $player-height;
  left: 0;
  width: $sidebar-width;
  background-color: #fff;
}
</style>
