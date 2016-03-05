let initDB = (DBName) => {
  return new Promise((resolve, reject) => {
    let req = window.indexedDB.open(DBName);
    req.onupgradeneeded = (event) => {
      let db = event.target.result;
      let objectStore = db.createObjectStore('songs', {
        keyPath: 'id'
      });
      objectStore.createIndex("title", "title", {
        unique: false
      });
      resolve(db);
    }
  });
}
let openDB = (DBName) => {
  return new Promise(function(resolve, reject) {
    let req = window.indexedDB.open(DBName);
    req.onsuccess = (event) => {
      let db = event.target.result;
      resolve(db);
    }
  });
}
let creatTransaction = (db, objectStore, permissions) => {
  return new Promise((resolve, reject) => {
    let transaction = db.transaction(objectStore, permissions);
    resolve(transaction);
  });
}
let getAllSongsFromDB = (transaction) => {
  return new Promise(function(resolve, reject) {
    let songs = [];
    let song = {};
    let objectStore = transaction.objectStore("songs");
    objectStore.openCursor().onsuccess = (event) => {
      let cursor = event.target.result;
      if (cursor) {
        songs.push(cursor.value);
        cursor.continue();
      } else {
        resolve(songs)
      }
    }
  });
}

let getSongFromDB = (transaction, id) => {
  return new Promise(function(resolve, reject) {
    let songs = [];
    let objectStore = transaction.objectStore("songs");
    let req = objectStore.openCursor();
    req.onsuccess = (event) => {
      let cursor = event.target.result;
      if (cursor) {
        if (typeof(id) === 'string') {
          if (cursor.value.id === id) {
            resolve(cursor.value);
          }
        } else {
          let index = id.indexOf(cursor.value.id)
          if (index !== -1) {
            songs[index] = cursor.value;
          }
        }
        cursor.continue();
      } else {
        resolve(songs);
      }
    }
  });
}

let changeSongFromDB = (transaction, id, attribute, value) => {
  return new Promise(function(resolve, reject) {
    let objectStore = transaction.objectStore("songs");
    let req = objectStore.get(id);
    req.onsuccess = (event) => {
      let song = req.result;
      song[attribute] = value;
      objectStore.put(song);
      resolve();
    }
  });
}

let deleteSongFromDB = (transaction, id) => {
  return new Promise(function(resolve, reject) {
    let objectStore = transaction.objectStore("songs");
    let req = objectStore.delete(id);
    req.onsuccess = (event) => {
      resolve();
    }
  });
}

let deleteSongByFolderFromDB = (transaction, path) => {
  return new Promise(function(resolve, reject) {
    let objectStore = transaction.objectStore("songs");
    let req = objectStore.openCursor();
    req.onsuccess = (event) => {
      let cursor = event.target.result;
      if(cursor) {
        if(cursor.value.path.startsWith(path)) {
          cursor.delete();
        }
        cursor.continue();
      } else {
        resolve();
      }
    }
  });
}

// let searchSong = (transaction, searchTerm) => {
//   return new Promise(function(resolve, reject) {
//     let result = [];
//     let objectStore = transaction.objectStore("songs");
//     let index = objectStore.index("title");
//     index.openCursor(IDBKeyRange.bound(searchTerm, searchTerm + '\uffff'), 'prev').onsuccess = (event) => {
//       let cursor = event.target.result;
//       if (cursor) {
//         result.push([cursor.value.column1, cursor.value.sortcolumn]);
//         cursor.continue();
//       } else {
//         if (result.length) {
//           result.sort(function(a, b) {
//             return a[1] - b[2]
//           });
//           resolve(result);
//         }
//       }
//     };
//   });
// }
export {
  initDB,
  openDB,
  getAllSongsFromDB,
  creatTransaction,
//  searchSong,
  changeSongFromDB,
  deleteSongFromDB,
  deleteSongByFolderFromDB,
  getSongFromDB
}
