import {
  openDB,
  getAllSongsFromDB,
  creatTransaction,
  changeSongFromDB,
  getSongFromDB,
  deleteSongByFolderFromDB,
  deleteSongFromDB
} from '../db';
import encode from './encode';


import ID3 from 'musicmetadata';
import Vibrant from 'node-vibrant';

const remote = require('electron').remote;
const fs = require('fs');
const dialog = remote.require('dialog');

class Song {
  constructor(tag, path) {
    this.id = Math.random().toString(36).substring(2, 6);
    this.title = tag.title || 'Unknown';
    this.album = tag.album || 'Unknown';
    this.artist = tag.artist[0] || 'Unknown';
    this.favorite = false;
    this.inCurrentList = false;
    this.path = path;
    if (tag.picture.length !== 0 && tag.picture[0].hasOwnProperty('data')) {
      this.image = "data:image/png;base64," + encode(tag.picture[0].data);
    }
  }
}

let addScannedFolder = () => {
  let scannedFolder = JSON.parse(localStorage.getItem("scannedFolder")) || [];
  let tempPath = dialog.showOpenDialog({
    properties: ['openDirectory']
  });
  if (!scannedFolder.includes(tempPath[0])) {
    scannedFolder.push(tempPath[0]);
    localStorage.setItem("scannedFolder", JSON.stringify(scannedFolder));
    return tempPath;
  }
}

let scanFolder = (path) => {
  const fileFormat = new Set(['mp3', 'aac', 'wav']);
  let fileList = new Set();
  let files = fs.readdirSync(path);
  files.forEach((item) => {
    let tmpPath = path + '/' + item,
      stats = fs.statSync(tmpPath);
    if (!stats.isDirectory()) {
      if (fileFormat.has(item.replace(/^.+\./, ''))) {
        fileList.add(tmpPath);
      }
    }
  });
  return fileList;
}

let getID3 = (filePath, songs) => {
  return new Promise(function(resolve, reject) {
    ID3(fs.createReadStream(filePath), (err, tag) => {
      songs.push(new Song(tag, filePath));
      resolve(songs);
    })
  });
}

let addSongs = async() => {
  let songs = [];
  let scannedFolder = addScannedFolder();
  if (scannedFolder) {
    for (let filePath of Array.from(scanFolder(scannedFolder[0])).values()) {
      songs = await getID3(filePath, songs);
    }
    let db = await openDB('AllSongs');
    let transaction = db.transaction(["songs"], "readwrite");
    let objectStore = transaction.objectStore("songs");
    for (let j = 0; j < songs.length; j++) {
      let req = objectStore.add(songs[j]);
      req.onsuccess = () => {};
      req.onerror = () => {
        //TODO
      };
    }
  }
}

let getSongs = async(listName) => {
  let songs = [];
  let db = await openDB(listName);
  let transaction = await creatTransaction(db, "songs", "readonly");
  songs = await getAllSongsFromDB(transaction);
  return songs;
}
let getSongByID = async(id) => {
  let song;
  let db = await openDB('AllSongs');
  let transaction = await creatTransaction(db, "songs", "readonly");
  song = await getSongFromDB(transaction, id);
  return song;
}
let changeSong = async(id, attribute, value) => {
  let db = await openDB('AllSongs');
  let transaction = await creatTransaction(db, "songs", "readwrite");
  await changeSongFromDB(transaction, id, attribute, value);
}

let deleteSong = async(id) => {
  let db = await openDB('AllSongs');
  let transaction = await creatTransaction(db, "songs", "readwrite");
  await deleteSongFromDB(transaction,id);
}

let deleteSongByFolder = async(folder) => {
  let db = await openDB('AllSongs');
  let transaction = await creatTransaction(db, "songs", "readwrite");
  await deleteSongByFolderFromDB(transaction,folder);
}

let switchSong = (method, isShuffle, list, lastSongID) => {
  let length = list.length;
  let index = list.indexOf(lastSongID);
  if (isShuffle) {
    let randomIndex = Math.round(Math.random() * length);
    while (randomIndex === index) {
      randomIndex = Math.round(Math.random() * length);
    }
    return list[randomIndex];
  } else {
    if (method === 'prev') {
      if (index <= 0) {
        return list[length - 1];
      } else {
        return list[index - 1];
      }
    } else if (method === 'next') {
      if (index === -1 || index >= length - 1) {
        return list[0];
      } else {
        return list[index + 1];
      }
    } else {
      console.log('Something wrong...');
    }
  }
}

export {
  addSongs,
  getSongs,
  getSongByID,
  changeSong,
  deleteSong,
  deleteSongByFolder,
  switchSong
};
