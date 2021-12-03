export function toFavoritesProps(favoritesQuery: getFavoritesQuery): FavoritesTileProps[] {
    const favoritesTileProps = [];
    for (let i = 0; i < favoritesQuery.length; i++) {
        favoritesTileProps.push({
            id: favoritesQuery[i].id,
            imageUrl: favoritesQuery[i].imageUrl,
            displayName: favoritesQuery[i].displayName,
            description: favoritesQuery[i].description,
        });
    }
    return favoritesTileProps;
}