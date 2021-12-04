export function toTileProps(searchResponse: SearchResponse): TileProps[] {
    const tileProps = [];
    for (let i = 0; i < searchResponse.searchResults.length; i++) {
        tileProps.push({
            id: searchResponse.searchResults[i].id,
            imageUrl: searchResponse.searchResults[i].image,
            displayName: searchResponse.searchResults[i].name,
            description: "",
        });
    }
    return tileProps;
}

export function toPaginationProps(searchResponse: SearchResponse): PaginationProps {
    return {
        currentPage: searchResponse.currentPage,
        previousPage: searchResponse.previousPage,
        nextPage: searchResponse.nextPage
    };
}