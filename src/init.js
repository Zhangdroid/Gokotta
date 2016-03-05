import {
  initDB
} from './db'
const defaultSetting = {
  show: false,
  notification: true
}
export default async function() {
  let db;
  if (localStorage.getItem("isFirstTime") === null) {
    db = await initDB('AllSongs');
    localStorage.setItem('isFirstTime', false);
    localStorage.setItem('currentList', '[]');
    localStorage.setItem('setting', JSON.stringify(defaultSetting));
  }
}
