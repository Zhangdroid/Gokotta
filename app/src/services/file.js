import fs from 'fs'
import path from 'path'
import mm from 'musicmetadata'

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

/**
 * if a file is a music file.
 * @param   {string} file - the path of file
 * @returns {boolean}
 */
function isMusicFile (file) {
  return SUPPORTED_FORMAT.has(path.extname(file).toLowerCase().replace(/./, ''))
}

function getMusicInformation (file) {
  return new Promise((resolve, reject) => {
    mm(fs.createReadStream(file), (err, tag) => {
      if (err) reject(err)
      resolve(tag)
    })
  })
}

export { isMusicFile, getMusicFileFromFolder, getMusicInformation }
