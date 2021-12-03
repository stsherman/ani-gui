export function toSearchResultProps(searchResponse: SearchResponse): SearchResultProps[] {
    const searchResultProps = [];
    for (let i = 0; i < searchResponse.length; i++) {
        searchResultProps.push({
            id: searchResponse[i].id,
            imageUrl: searchResponse[i].image,
            displayName: searchResponse[i].name
        });
    }
    return searchResultProps;
}
