function openDB ({
  store = 'ALL_SONGS',
  key = 'id',
  version = 1
} = {}) {
  const request = window.indexedDB.open('Gokotta', version)

  return new Promise((resolve, reject) => {
    request.onupgradeneeded = event => {
      let db = event.target.result
      db.createObjectStore(store, { keyPath: key })
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
