import {
  initDB
} from './db'

export default async function() {
  let db;
  if (localStorage.getItem("isFirstTime") === null) {
    db = await initDB('AllSongs');
    localStorage.setItem('isFirstTime', false);
    localStorage.setItem('currentList', '[]');
  }
}
