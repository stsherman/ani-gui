import MaterialIcon from "./material-icon";
import React, {useEffect, useState} from "react";
import styled from "styled-components";

const StyledPaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0 0;
`;

const StyledPaginationIcon = styled(MaterialIcon)`
  border-radius: 4px;
  padding: 2px 0;
  
  &[disabled] {
    color: grey;
  }
  &:not([disabled]) {
    cursor: pointer;
    &:hover {
      background: #4b4b4b;
    }
  }
`;

const StyledPaginationItem = styled.span`
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;

  &:hover {
    background: #4b4b4b;
  }
  
  &&[class*=selected] {
    background: #525252;
  }
`;

const createRange = (min: number, max: number) => {
    return Array(1 + max - min).fill(0).map((x, i) => i + min);
};

export default function Pagination({minPage, maxPage, activePage, onNavigate}: PaginationProps) {
    const [pages, setPages] = useState(createRange(minPage, maxPage));

    useEffect(() => {
        setPages(createRange(minPage, maxPage));
    }, [minPage, maxPage])

    return (
        <StyledPaginationContainer>
            <StyledPaginationIcon
                disabled={activePage === minPage}
                onClick={() => onNavigate?.(activePage - 1)}
            >
                navigate_before
            </StyledPaginationIcon>
            {pages.map((pageNumber: number, index: number) =>
                <StyledPaginationItem
                    key={index}
                    className={pageNumber === activePage ? 'selected' : ''}
                    onClick={() => onNavigate?.(pageNumber)}>
                    {pageNumber}
                </StyledPaginationItem>
            )}
            <StyledPaginationIcon
                disabled={activePage === maxPage}
                onClick={() => onNavigate?.(activePage + 1)}
            >
                navigate_next
            </StyledPaginationIcon>
        </StyledPaginationContainer>
    );
}