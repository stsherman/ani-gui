import React, {useState} from "react";
import styled from "styled-components";
import usePromise from "../hooks/use-promise";
import {toPaginationProps, toTileProps} from "../mappers/search";
import useShowLoader from "../hooks/use-show-loader";
import {Params, useParams} from "react-router-dom";
import Tile from "./tile";
import MaterialIcon from "./material-icon";

const StyledSearchResultsContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledSearchResultTilesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  height: 100%;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b7b7f9;
    border-radius: 20px;
  }
`;

const StyledSearchResultPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0 0;
  & > * {
    margin-left: 8px;
  }
  & > [class*=material-icons]:not([disabled]) {
    cursor: pointer;
  }
  & > [class*=material-icons][disabled] {
    color: grey;
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

    const onPaginationClick = (page: number | undefined) => {
        if (page) {
            setPage(page);
        }
    }

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
                <StyledSearchResultPagination>
                    <MaterialIcon
                        disabled={!searchResponse.pagination.previousPage}
                        onClick={() => onPaginationClick(searchResponse.pagination.previousPage)}
                    >
                        navigate_before
                    </MaterialIcon>
                    <span>{searchResponse.pagination.currentPage}</span>
                    <MaterialIcon
                        disabled={!searchResponse.pagination.nextPage}
                        onClick={() => onPaginationClick(searchResponse.pagination.nextPage)}
                    >
                        navigate_next
                    </MaterialIcon>
                </StyledSearchResultPagination>
            </StyledSearchResultsContainer>}
        </>
    );
}