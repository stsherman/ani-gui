const { contextBridge } = require('electron')
const db = require('./modules/database');
const scraper = require('./modules/scraper');

contextBridge.exposeInMainWorld('electron', {
  getFavorites: async () => await db.getFavorites(),
  getHistory: async () => await db.getHistory(),
  search: async (query) => await scraper.search(query),
  details: async (id) => await scraper.details(id),
  isFavorite: async (id) => await db.isFavorite(id),
})
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
