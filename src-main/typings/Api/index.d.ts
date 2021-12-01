interface Api {
    getFavorites: () => Promise<Anime[]>,
    getHistory: () => Promise<Anime[]>,
    getDetails: (id: string | undefined) => Promise<Details>,
}