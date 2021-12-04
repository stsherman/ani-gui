interface Api {
    getFavorites: () => Promise<Anime[]>,
    getHistory: () => Promise<Anime[]>,
    getDetails: (id: string | undefined) => Promise<GetDetailsResponse>,
    search: (keyword: string | undefined, page?: number) => Promise<SearchResponse>,
}

interface Window {
    api: Api
}
