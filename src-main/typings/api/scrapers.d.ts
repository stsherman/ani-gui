import ArrayLike = jasmine.ArrayLike;

interface GetDetailsResponse extends Record<string, string | any[] | boolean> {
    description: string;
    episodes: any[];
    genre: string;
    image: string;
    isFavorite: boolean;
    status: string;
    title: string;
    type: string;
}

interface SearchResult {
    id: string;
    image: string;
    name: string;
}

interface SearchResponse {
    searchResults: ArrayLike<SearchResult>,
    currentPage: number;
    previousPage?: number;
    nextPage?: number;
}