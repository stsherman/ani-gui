export interface FavoritesTileProps {
    id: string;
    imageUrl: string;
    displayName: string;
    description: string;
}

export interface FavoritesProps {
    favorites: FavoritesTileProps[];
}