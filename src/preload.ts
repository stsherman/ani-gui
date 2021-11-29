const { contextBridge } = require('electron')
const db = require('./modules/database');
const scraper = require('./modules/scraper');

contextBridge.exposeInMainWorld('electron', <Electron>{
  getFavorites: async () => await db.getFavorites(),
  getHistory: async () => await db.getHistory(),
  search: async (query: String) => await scraper.search(query),
  details: async (id: String) => await scraper.details(id),
  isFavorite: async (id: String) => await db.isFavorite(id),
})
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {

})
