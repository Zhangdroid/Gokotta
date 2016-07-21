<template>
  <div
    class="container"
    @dragenter.prevent.stop
    @dragover.prevent.stop
    @drop.prevent="handleDrop($event)">
    test
  </div>
</template>

<script>
import { getMusicFileFromFolder } from '../services/file'
export default {
  methods: {
    handleDrop (e) {
      let files = getMusicFileFromFolder(e.dataTransfer.files[0].path)
      console.log(files)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}
</style>
