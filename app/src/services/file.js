import fs from 'fs'
import path from 'path'

const SUPPORTED_FORMAT = new Set(['mp3', 'ogg', 'wav', 'aac', 'w4a', 'weba'])

 /**
  * Get music files from folder.
  * @param   {string} folder - the path of music folder
  * @returns {Set}    Music files
  */
function getMusicFileFromFolder (folder) {
  let songs = new Set()
  const files = fs.readdirSync(folder)
  files.forEach(item => {
    let currentPath = path.join(folder, item)
    if (fs.statSync(currentPath).isDirectory()) {
      let newSongs = getMusicFileFromFolder(currentPath)
      songs = new Set([...songs, ...newSongs])
    } else if (isMusicFile(currentPath)) {
      songs.add(currentPath)
    }
  })
  return songs
}

export { getMusicFileFromFolder }
