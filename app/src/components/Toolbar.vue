<template>
  <div class="toolbar"></div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../styles/variables";
.toolbar {
  position: fixed;
  z-index: $toolbar-zindex;
  top: 0;
  left: 0;
  width: 100%;
  height: $toolbar-height;
  background-color: rgba(#009688, .8);
  backdrop-filter: blur(5px);
}
</style>
