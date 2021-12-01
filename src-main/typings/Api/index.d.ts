interface Api {
    getFavorites: () => Promise<Anime[]>,
    getHistory: () => Promise<Anime[]>,
}