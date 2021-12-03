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

interface SearchResponse extends ArrayLike<{
    id: string;
    image: string;
    name: string;
}> {}