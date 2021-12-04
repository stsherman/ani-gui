export function toTileProps(favoritesQuery: getFavoritesQuery): TileProps[] {
    const tileProps = [];
    for (let i = 0; i < favoritesQuery.length; i++) {
        tileProps.push({
            id: favoritesQuery[i].id,
            imageUrl: favoritesQuery[i].imageUrl,
            displayName: favoritesQuery[i].displayName,
            description: favoritesQuery[i].description,
        });
    }
    return tileProps;
}