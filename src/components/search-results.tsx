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

const StyledSearchResultPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0 0;

  & > * {
    border-radius: 4px;
    padding: 4px 8px;
  }
  
  & > [class*=material-icons] {
    padding: 2px 0;
  }

  & > *:not([disabled]) {
    cursor: pointer;
    &:hover {
      background: #4b4b4b;
    }
  }

  && > [class*=selected] {
    background: #525252;
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
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        navigate_before
                    </MaterialIcon>
                    {searchResponse.pagination.map((pageNumber: number, index: number) =>
                        <span
                            key={index}
                            className={pageNumber === page ? 'selected' : ''}
                            onClick={() => setPage(pageNumber)}>{pageNumber}
                        </span>
                    )}
                    <MaterialIcon
                        disabled={page === searchResponse.pagination[searchResponse.pagination.length - 1]}
                        onClick={() => setPage(page + 1)}
                    >
                        navigate_next
                    </MaterialIcon>
                </StyledSearchResultPagination>
            </StyledSearchResultsContainer>}
        </>
    );
}