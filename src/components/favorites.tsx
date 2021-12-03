import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import useAppContext from "../hooks/use-app-context";
import {toFavoritesProps} from "../mappers/favorites";
import {toHistoryProps} from "../mappers/history";

const StyledFavoritesContainer = styled.div`
  display: flex;
`;

const StyledFavoritesTileContainer = styled.div`
  padding: 2px;

  &:hover {
    border: 2px solid #FFFFFF;
    padding: 0;
  }
`;

const StyledFavoritesTile = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  background: #474747;
  cursor: pointer;
`;

const StyledFavoritesImg = styled.img`
  width: 180px;
  height: 232px;
  object-fit: cover;
`;

const StyledFavoritesTitle = styled.span`
  font-size: 14px;
  font-weight: bold;
  padding: 8px 8px 4px;
`;

const StyledFavoritesText = styled.span`
  font-size: 12px;
  padding: 4px 8px 8px;
`;

function FavoritesTile({id, imageUrl, displayName, description, onClick}: FavoritesTileProps) {
    return (
        <StyledFavoritesTileContainer
            onClick={onClick}
        >
            <StyledFavoritesTile>
                <StyledFavoritesImg src={imageUrl}/>
                <StyledFavoritesTitle>{displayName}</StyledFavoritesTitle>
                <StyledFavoritesText>{description}</StyledFavoritesText>
            </StyledFavoritesTile>
        </StyledFavoritesTileContainer>
    );
}

export default function Favorites({onTileClick}: Partial<FavoritesProps>) {
    const [appState, setAppState] = useAppContext();
    const [favorites, setFavorites] = useState([] as FavoritesTileProps[]);

    useEffect(() => {
        if (appState.isLoaderShowing) {
            console.log('getting Favorites');
            window.api.getFavorites().then(f => {
                setFavorites(toFavoritesProps(f));
                setAppState({
                    ...appState,
                    isLoaderShowing: false,
                    title: "Favorites"
                });
            });
        } else if (appState.title !== "Favorites") {
            setAppState({
                ...appState,
                isLoaderShowing: true,
                title: "Favorites"
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appState.title, appState.isLoaderShowing]);

    return (
        <StyledFavoritesContainer>
            {favorites?.map((favorite, index) => (
                <FavoritesTile
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