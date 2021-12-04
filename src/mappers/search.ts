export function toTileProps(searchResponse: SearchResponse): TileProps[] {
    const tileProps = [];
    for (let i = 0; i < searchResponse.length; i++) {
        tileProps.push({
            id: searchResponse[i].id,
            imageUrl: searchResponse[i].image,
            displayName: searchResponse[i].name,
            description: "",
        });
    }
    return tileProps;
}
