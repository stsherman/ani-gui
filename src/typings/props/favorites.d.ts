interface FavoritesTileProps {
    id: string;
    imageUrl: string;
    displayName: string;
    description: string;
    onClick: () => void;
}

interface FavoritesProps {
    // favorites: FavoritesTileProps[];
    onTileClick: (id: string) => void;
}