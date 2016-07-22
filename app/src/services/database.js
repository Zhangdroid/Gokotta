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

export { openDB }
