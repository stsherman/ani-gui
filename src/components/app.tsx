import React from 'react';
import Header from './header';
import Favorites from "./favorites";
import Content from "./content";
import styled from 'styled-components';
import SideNav from "./side-nav";
import {Route, Routes, useNavigate} from "react-router-dom";
import Details from "./details";
import useAppContext from "../hooks/use-app-context";
import Loader from "./loader";
import History from "./history";
import SearchResults from "./search-results";

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
    let navigate = useNavigate();
    const [appState, , updateAppState] = useAppContext();

    const onSearchClick = async (query: string) => {
        navigate(`/search/${query}`, { replace: true });
    }

    const onMenuClick = () => updateAppState({ isSideNavOpen: true });

    const onSideNavItemClick = (target: string) => {
        navigate(`/${target}`, { replace: true });
        updateAppState({ isSideNavOpen: false });
    }

    const showDetails = (id: string) => navigate(`/details/${id}`, { replace: true });

    return (
        <StyledAppContainer>
            <Header
                title={appState.title}
                onSearchClick={onSearchClick}
                onMenuClick={onMenuClick}
            />
            <SideNav
                isOpen={appState.isSideNavOpen}
                onItemClick={onSideNavItemClick}
            />
            <Content>
                <Routes>
                    <Route path="/" element={<Favorites onTileClick={showDetails} />} />
                    <Route path="/favorites" element={<Favorites onTileClick={showDetails} />} />
                    <Route path="/history" element={<History onTileClick={showDetails} />} />
                    <Route path="/details/:id" element={<Details />} />
                    <Route path="/search/:query" element={<SearchResults onTileClick={showDetails} />} />
                </Routes>
            </Content>
            <Loader isShown={appState.isLoaderShowing} />
        </StyledAppContainer>
    );
}
