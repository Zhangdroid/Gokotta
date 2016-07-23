/**
 * Open or create a database.
 * @param   {string[]} store
 * @param   {string} [key='id']
 * @param   {number} [version=1]
 * @returns {Promise}
 */
function openDB ({
  stores = [
    { name: 'ALL_SONGS', key: 'id' },
    { name: 'PLAYLIST', key: 'id' }
  ],
  key = 'id',
  version = 1
} = {}) {
  const request = window.indexedDB.open('Gokotta', version)

  return new Promise((resolve, reject) => {
    request.onupgradeneeded = event => {
      let db = event.target.result
      stores.forEach(store => {
        db.createObjectStore(store.name, { keyPath: store.key })
      })
      resolve(db)
    }

    request.onsuccess = event => {
      resolve(event.target.result)
    }

    request.onerror = error => {
      reject(error)
    }
  })
}

/**
 * Get all songs from database.
 * @param   {object} database
 * @returns {Promise}
 */
function getAllSongs (db) {
  return new Promise((resolve, reject) => {
    const songs = []
    const objectStore = db.transaction('ALL_SONGS', 'readwrite').objectStore('ALL_SONGS')
    objectStore.openCursor().onsuccess = (event) => {
      const cursor = event.target.result
      if (cursor) {
        songs.push(cursor.value)
        cursor.continue()
      } else {
        resolve(songs)
      }
    }
  })
}

export { openDB, getAllSongs }
