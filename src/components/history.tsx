import React from 'react';
import styled from 'styled-components';
import {toHistoryProps} from "../mappers/history";
import usePromise from "../hooks/use-promise";
import useShowLoader from "../hooks/use-show-loader";

const StyledHistoryContainer = styled.div`
  display: flex;
`;

const StyledHistoryTileContainer = styled.div`
  padding: 2px;

  &:hover {
    border: 2px solid #FFFFFF;
    padding: 0;
  }
`;

const StyledHistoryTile = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  background: #474747;
  cursor: pointer;
`;

const StyledHistoryImg = styled.img`
  width: 180px;
  height: 232px;
  object-fit: cover;
`;

const StyledHistoryTitle = styled.span`
  font-size: 14px;
  font-weight: bold;
  padding: 8px 8px 4px;
`;

const StyledHistoryText = styled.span`
  font-size: 12px;
  padding: 4px 8px 8px;
`;

function HistoryTile({id, imageUrl, displayName, description, onClick}: HistoryTileProps) {
    return (
        <StyledHistoryTileContainer
            onClick={onClick}
        >
            <StyledHistoryTile>
                <StyledHistoryImg src={imageUrl}/>
                <StyledHistoryTitle>{displayName}</StyledHistoryTitle>
                <StyledHistoryText>{description}</StyledHistoryText>
            </StyledHistoryTile>
        </StyledHistoryTileContainer>
    );
}

export default function History({onTileClick}: Partial<HistoryProps>) {
    const history = usePromise(() => window.api.getHistory().then(toHistoryProps));
    useShowLoader(history, () => ({ title: "History" }));

    return (
        <StyledHistoryContainer>
            {history?.map((favorite, index) => (
                <HistoryTile
                    id={favorite.id}
                    imageUrl={favorite.imageUrl}
                    displayName={favorite.displayName}
                    description={favorite.description.substr(0, 15)}
                    key={index}
                    onClick={() => onTileClick?.(favorite.id)}
                />))}
        </StyledHistoryContainer>
    );
}