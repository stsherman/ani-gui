import React from 'react';
import Header from '../Header/Header';
import Favorites from "../Favorites/Favorites";
import Content from "../Content/Content";
import styled from 'styled-components';

const StyledAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  padding: 16px;
  min-width: 740px;
  max-width: 1100px;
  margin: auto;
`;

export default function App() {
    const onSearchClick = async (query: string) => {
        // @ts-ignore
        const searchResult = await window.api.search(query);
        console.log('search result', searchResult);
    }
    const onMenuClick = () => {
        console.log('onMenuClick');
    }
    return (
        <StyledAppContainer>
            <Header
                title={"Favorites"}
                onSearchClick={onSearchClick}
                onMenuClick={onMenuClick}
            />
            <Content>
                <Favorites /> 
            </Content>
        </StyledAppContainer>
    );
}
