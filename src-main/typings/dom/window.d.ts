interface Api {
    getFavorites: () => Promise<Anime[]>,
    getHistory: () => Promise<Anime[]>,
    getDetails: (id: string) => Promise<GetDetailsResponse>,
    search: (query: string) => Promise<SearchResponse>,
}

interface Window {
    api: Api
}
