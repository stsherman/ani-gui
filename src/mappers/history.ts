export function toHistoryProps(historyQuery: getHistoryQuery): HistoryTileProps[] {
    const historyTileProps = [];
    for (let i = 0; i < historyQuery.length; i++) {
        historyTileProps.push({
            id: historyQuery[i].id,
            imageUrl: historyQuery[i].imageUrl,
            displayName: historyQuery[i].displayName,
            description: historyQuery[i].description,
        });
    }
    return historyTileProps;
}