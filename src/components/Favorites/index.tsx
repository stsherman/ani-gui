import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

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

function FavoritesTile({id, imageUrl, displayName, description}: Partial<FavoritesTileProps>) {
    return (
        <StyledFavoritesTileContainer>
            <StyledFavoritesTile>
                <StyledFavoritesImg src={imageUrl} />
                <StyledFavoritesTitle>{displayName}</StyledFavoritesTitle>
                <StyledFavoritesText>{description}</StyledFavoritesText>
            </StyledFavoritesTile>
        </StyledFavoritesTileContainer>
    );
}

export default function Favorites() {
    const [favorites, setFavorites] = useState([] as FavoritesTileProps[]);

    async function getFavorites() {
        const f = await window.api.getFavorites();
        console.log('f', f);
        setFavorites(f);
    }

    useEffect(() => {
        console.log('getting Favorites');
        getFavorites();
    }, []);

    return (
        <StyledFavoritesContainer>
            {favorites?.map((favorite, index) => (<FavoritesTile
                id={favorite.id}
                imageUrl={favorite.imageUrl}
                displayName={favorite.displayName}
                description={favorite.description.substr(0, 15)}
                key={index}
            />))}
        </StyledFavoritesContainer>
    );
}