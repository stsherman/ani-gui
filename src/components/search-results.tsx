import React, {useState} from "react";
import styled from "styled-components";
import usePromise from "../hooks/use-promise";
import {toPaginationProps, toTileProps} from "../mappers/search";
import useShowLoader from "../hooks/use-show-loader";
import {Params, useParams} from "react-router-dom";
import Tile from "./tile";
import Pagination from "./pagination";

const StyledSearchResultsContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledSearchResultTilesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b7b7f9;
    border-radius: 20px;
  }
`;

export default function SearchResults({onTileClick}: SearchResultsProps) {
    let {query}: Readonly<Params<"query">> = useParams();
    const [page, setPage] = useState(1);
    const searchResponse = usePromise(() => window.api.search(query, page).then((searchResponse) => ({
        searchResults: toTileProps(searchResponse),
        pagination: toPaginationProps(searchResponse)
    })), [query, page]);
    useShowLoader(searchResponse, () => ({ title: `Search: ${query}` }));

    return (
        <>
            {searchResponse && <StyledSearchResultsContainer>
                <StyledSearchResultTilesContainer>
                    {searchResponse.searchResults.map((searchResult, index) => (
                        <Tile
                            id={searchResult.id}
                            imageUrl={searchResult.imageUrl}
                            displayName={searchResult.displayName}
                            description={searchResult.description.substr(0, 15)}
                            onClick={() => onTileClick(searchResult.id)}
                            key={index}
                        />))}
                </StyledSearchResultTilesContainer>
                <Pagination
                    minPage={searchResponse.pagination.minPage}
                    maxPage={searchResponse.pagination.maxPage}
                    activePage={page}
                    onNavigate={setPage}
                />
            </StyledSearchResultsContainer>}
        </>
    );
}