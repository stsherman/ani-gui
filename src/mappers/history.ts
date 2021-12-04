export function toTileProps(historyQuery: getHistoryQuery): TileProps[] {
    const tileProps = [];
    for (let i = 0; i < historyQuery.length; i++) {
        tileProps.push({
            id: historyQuery[i].id,
            imageUrl: historyQuery[i].imageUrl,
            displayName: historyQuery[i].displayName,
            description: historyQuery[i].description,
        });
    }
    return tileProps;
}