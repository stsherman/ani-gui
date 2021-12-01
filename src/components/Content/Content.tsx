import React, { HTMLProps } from "react";
import styled from 'styled-components';

const StyledContentContainer = styled.div`
  height: 100%;
  overflow: auto;
  margin-top: 8px;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: #b7b7f9;
    border-radius: 20px;
  }
`;

export default function Content({ children }: HTMLProps<any>) {
    return (
        <StyledContentContainer>
            {children}
        </StyledContentContainer>
    );
}