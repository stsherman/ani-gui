interface DetailsProps {
    type: string;
    image: string;
    summary: string;
    genre: string;
    status: string;
    episodes: any[];
    isFavorite: boolean;
}

interface DetailsParams {
    id: string;
}