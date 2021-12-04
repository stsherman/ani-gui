import React from 'react';
import styled from 'styled-components';
import {toTileProps} from "../mappers/history";
import usePromise from "../hooks/use-promise";
import useShowLoader from "../hooks/use-show-loader";
import Tile from "./tile";

const StyledHistoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function History({onTileClick}: Partial<HistoryProps>) {
    const history = usePromise(() => window.api.getHistory().then(toTileProps));
    useShowLoader(history, () => ({ title: "History" }));

    return (
        <StyledHistoryContainer>
            {history?.map((favorite, index) => (
                <Tile
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