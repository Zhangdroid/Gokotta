import GUID from '../utils/guid'

class Song {
  constructor (tag, path) {
    this.id = GUID()
    Object.assign(this, tag, { path })
  }
}

export { Song }
