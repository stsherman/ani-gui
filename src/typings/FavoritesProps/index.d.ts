interface FavoritesTileProps {
    id: string;
    imageUrl: string;
    displayName: string;
    description: string;
}

interface FavoritesProps {
    favorites: FavoritesTileProps[];
}