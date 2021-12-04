import React from 'react';
import styled from 'styled-components';
import {toTileProps} from "../mappers/favorites";
import usePromise from "../hooks/use-promise";
import useShowLoader from "../hooks/use-show-loader";
import Tile from "./tile";

const StyledFavoritesContainer = styled.div`
  display: flex;
`;

export default function Favorites({onTileClick}: Partial<FavoritesProps>) {
    const favorites = usePromise(() => window.api.getFavorites().then(toTileProps));
    useShowLoader(favorites, () => ({ title: "Favorites" }));

    return (
        <StyledFavoritesContainer>
            {favorites?.map((favorite, index) => (
                <Tile
                    id={favorite.id}
                    imageUrl={favorite.imageUrl}
                    displayName={favorite.displayName}
                    description={favorite.description.substr(0, 15)}
                    key={index}
                    onClick={() => onTileClick?.(favorite.id)}
                />))}
        </StyledFavoritesContainer>
    );
}