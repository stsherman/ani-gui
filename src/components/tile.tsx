import React from "react";
import styled from "styled-components";
import Breakpoints from "../constants/breakpoints";

const StyledTileContainer = styled.div`
  padding: 2px;
  flex-basis: calc(33.3% - 8px);  
  margin: 4px;
  
  &:hover {
    border: 2px solid #FFFFFF;
    padding: 0;
  }
  
  @media (min-width: ${Breakpoints.sm}px) {
    flex-basis: calc(25% - 8px);  
  }

  @media (min-width: ${Breakpoints.lg}px) {
    flex-basis: calc(20% - 8px);
  }
`;

const StyledTile = styled.div`
  display: flex;
  flex-direction: column;
  background: #474747;
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

const StyledTileImg = styled.img`
  width: 100%;
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