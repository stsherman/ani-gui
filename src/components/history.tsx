import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import useAppContext from "../hooks/use-app-context";
import {toHistoryProps} from "../mappers/history";

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
    const [appState, setAppState] = useAppContext();
    const [history, setHistory] = useState([] as HistoryTileProps[]);

    useEffect(() => {
        if (appState.isLoaderShowing) {
            console.log('getting History');
            window.api.getHistory().then(f => {
                setHistory(toHistoryProps(f));
                setAppState({
                    ...appState,
                    isLoaderShowing: false
                });
            });
        } else if (appState.title !== "History") {
            setAppState({
                ...appState,
                isLoaderShowing: true,
                title: "History"
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appState.title, appState.isLoaderShowing]);

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