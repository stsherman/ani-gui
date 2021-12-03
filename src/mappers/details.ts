export function toDetailsState(detailsResponse: GetDetailsResponse): DetailsState {
    return {
        description: detailsResponse.description,
        episodes: detailsResponse.episodes,
        genres: detailsResponse.genre.split(","),
        imageSrc: detailsResponse.image,
        isFavorite: detailsResponse.isFavorite,
        status: detailsResponse.status,
        title: detailsResponse.title,
        type: detailsResponse.type,
    }
}