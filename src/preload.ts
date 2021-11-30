const { contextBridge } = require('electron')
import { getFavorites, getHistory, isFavorite } from './modules/database';
const scraper = require('./modules/scraper');

contextBridge.exposeInMainWorld('electron', <Electron>{
  getFavorites: async () => await getFavorites(),
  getHistory: async () => await getHistory(),
  search: async (query: string) => await scraper.search(query),
  details: async (id: string) => await scraper.details(id),
  isFavorite: async (id: string) => await isFavorite(id),
})
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {

})
