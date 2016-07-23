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
import { isMusicFile, getMusicFileFromFolder, getMusicInformation } from '../services/file'
import { Song } from '../services/song'
export default {
  methods: {
    getAllMusicFiles (e) {
      const length = e.dataTransfer.items.length
      let songs = new Set()
      for (let i = 0; i < length; i++) {
        const entry = e.dataTransfer.items[i].webkitGetAsEntry()
        const path = e.dataTransfer.files[i].path
        if (entry.isFile) {
          if (isMusicFile(path)) {
            songs.add(path)
          }
        } else if (entry.isDirectory) {
          const newSongs = getMusicFileFromFolder(path)
          songs = new Set([...songs, ...newSongs])
        }
      }
      return songs
    },
    async handleDrop (e) {
      const songsPath = this.getAllMusicFiles(e)
      const songs = []
      for (let path of songsPath) {
        const tag = await getMusicInformation(path)
        const song = new Song(tag, path)
        songs.push(song)
      }
      const objectStore = this.$db.transaction('ALL_SONGS', 'readwrite').objectStore('ALL_SONGS')
      songs.forEach(song => {
        let req = objectStore.add(song)
        req.onerror = (error) => {
          // Todo
          console.log(error)
        }
      })
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
