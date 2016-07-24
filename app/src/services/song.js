import GUID from '../utils/guid'
import encode from '../utils/encode'

class Song {
  constructor (tag, path) {
    this.id = GUID()
    for (let prop in tag) {
      if (prop === 'picture') {
        if (tag.picture[0].data) {
          tag.cover = `data:image/png;base64,${encode(tag.picture[0].data)}`
          delete tag.picture
        }
      }
    }
    Object.assign(this, tag, { path })
  }
}

export { Song }
