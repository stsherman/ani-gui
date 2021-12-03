import React from 'react';
import Header from './header';
import Favorites from "./favorites";
import Content from "./content";
import styled from 'styled-components';
import SideNav from "./side-nav";
import {Route, Routes, useNavigate} from "react-router-dom";
import Details from "./details";
import useAppContext from "../hooks/use-app-context";
import {DetailsProvider} from "../hooks/use-details-context";
import Loader from "./loader";
import History from "./history";

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
    const [appState, setAppState] = useAppContext();

    const onSearchClick = async (query: string) => {
        const searchResult = await window.api.search(query);
        console.log('search result', searchResult);
    }

    const onMenuClick = () => setAppState({ ...appState, isSideNavOpen: true });

    const onSideNavItemClick = (target: string) => {
        console.log('onSideNavItemClick', target);
        navigate(`/${target}`, { replace: true });
        setAppState({ ...appState, isSideNavOpen: false });
    }

    const onFavoritesTileClick = (id: string) => navigate(`/details/${id}`, { replace: true });
    const onHistoryTileClick = (id: string) => navigate(`/details/${id}`, { replace: true });

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
                    <Route path="/" element={<Favorites onTileClick={onFavoritesTileClick} />} />
                    <Route path="/favorites" element={<Favorites onTileClick={onFavoritesTileClick} />} />
                    <Route path="/history" element={<History onTileClick={onHistoryTileClick} />} />
                    <Route path="/details/:id" element={<DetailsProvider><Details /></DetailsProvider>} />
                </Routes>
            </Content>
            <Loader isShown={appState.isLoaderShowing} />
        </StyledAppContainer>
    );
}
