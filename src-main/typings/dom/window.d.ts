interface Api {
    getFavorites: () => Promise<Anime[]>,
    getHistory: () => Promise<Anime[]>,
    getDetails: (id: string | undefined) => Promise<GetDetailsResponse>,
    search: (query: string | undefined) => Promise<SearchResponse>,
}

interface Window {
    api: Api
}
