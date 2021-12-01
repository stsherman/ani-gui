import React, {useState} from 'react';
import Header from '../Header';
import Favorites from "../Favorites";
import Content from "../Content";
import styled from 'styled-components';
import SideNav from "../SideNav";
import {Route, Routes} from "react-router-dom";
import Details from "../Details";

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
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    const onSearchClick = async (query: string) => {
        // @ts-ignore
        const searchResult = await window.api.search(query);
        console.log('search result', searchResult);
    }
    const onMenuClick = () => {
        setIsSideNavOpen(true);
        console.log('isSideNavOpen', isSideNavOpen);
    }
    const onSideNavClose = () => {
        setIsSideNavOpen(false);
    }
    const onSideNavItemClick = (target: string) => {
        console.log('onSideNavItemClick', target);
    }

    return (
        <StyledAppContainer>
            <Header
                title={"Favorites"}
                onSearchClick={onSearchClick}
                onMenuClick={onMenuClick}
            />
            <SideNav
                isOpen={isSideNavOpen}
                onClose={onSideNavClose}
                onItemClick={onSideNavItemClick}
            />
            <Content>
                <Routes>
                    <Route path="/" element={<Favorites />} />
                    <Route path="/favorites" element={<Favorites />} />
                    {/*<Route path="/history" />*/}
                    <Route path="/details/:id" element={<Details />} />
                </Routes>
            </Content>
        </StyledAppContainer>
    );
}
