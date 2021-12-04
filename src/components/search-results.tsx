import React from "react";
import styled from "styled-components";
import usePromise from "../hooks/use-promise";
import {toTileProps} from "../mappers/search";
import useShowLoader from "../hooks/use-show-loader";
import {Params, useParams} from "react-router-dom";
import Tile from "./tile";

const StyledSearchResultsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default function SearchResults({onTileClick}: SearchResultsProps) {
    let {query}: Readonly<Params<"query">> = useParams();
    const searchResults = usePromise(() => window.api.search(query).then(toTileProps));
    useShowLoader(searchResults, () => ({ title: `Search: ${query}` }));

    return (
        <StyledSearchResultsContainer>
            {searchResults?.map((searchResult, index) => (
                <Tile
                    id={searchResult.id}
                    imageUrl={searchResult.imageUrl}
                    displayName={searchResult.displayName}
                    description={searchResult.description.substr(0, 15)}
                    onClick={() => onTileClick(searchResult.id)}
                    key={index}
                />))}
        </StyledSearchResultsContainer>
    );
}