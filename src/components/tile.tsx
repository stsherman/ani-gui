import React from "react";
import styled from "styled-components";

const StyledTileContainer = styled.div`
  padding: 2px;

  &:hover {
    border: 2px solid #FFFFFF;
    padding: 0;
  }
`;

const StyledTile = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  background: #474747;
  cursor: pointer;
`;

const StyledTileImg = styled.img`
  width: 180px;
  height: 232px;
  object-fit: cover;
`;

const StyledTileTitle = styled.span`
  font-size: 14px;
  font-weight: bold;
  padding: 8px 8px 4px;
`;

const StyledTileText = styled.span`
  font-size: 12px;
  padding: 4px 8px 8px;
`;


export default function Tile({id, imageUrl, displayName, description, onClick}: TileProps) {
    return (
        <StyledTileContainer onClick={onClick}>
            <StyledTile>
                <StyledTileImg src={imageUrl}/>
                <StyledTileTitle>{displayName}</StyledTileTitle>
                <StyledTileText>{description}</StyledTileText>
            </StyledTile>
        </StyledTileContainer>
    );
}