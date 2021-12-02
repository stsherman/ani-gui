interface Api {
    getFavorites: () => Promise<Anime[]>,
    getHistory: () => Promise<Anime[]>,
    getDetails: (id: string) => Promise<GetDetailsResponse>,
    search: (query: string) => Promise<SearchResponse>,
}

interface GetDetailsResponse extends Record<string, string | any[] | boolean> {
    type: string;
    image: string;
    description: string;
    genre: string;
    status: string;
    episodes: any[];
    isFavorite: boolean;
}

interface SearchResponseItem {
    image: string;
    name: string;
    id: string;
}

interface SearchResponse extends ArrayLike<SearchResponseItem> {

}