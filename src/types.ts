interface Electron {
    getFavorites: () => Promise<Array<any>>,
    getHistory: () => Promise<Array<any>>,
    search: (query: String) => Promise<Array<any>>,
    details: (id: String) => Promise<any>,
    isFavorite: (id: String) => Promise<Boolean>,
}

interface Window {
    electron: Electron
}