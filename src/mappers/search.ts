export function toTileProps({ searchResults }: SearchResponse): TileProps[] {
    const tileProps = [];
    for (let i = 0; i < searchResults.length; i++) {
        tileProps.push({
            id: searchResults[i].id,
            imageUrl: searchResults[i].image,
            displayName: searchResults[i].name,
            description: "",
        });
    }
    return tileProps;
}

export function toPaginationProps({ pagination }: SearchResponse): PaginationProps {
    const paginationProps = [];

    for (let i = pagination.min; i <= pagination.max; i++) {
        paginationProps.push(i);
    }
    
    return paginationProps;
}