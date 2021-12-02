import React, {useState} from 'react';
import Header from '../Header';
import Favorites from "../Favorites";
import Content from "../Content";
import styled from 'styled-components';
import SideNav from "../SideNav";
import {Route, Routes, useNavigate} from "react-router-dom";
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
    let navigate = useNavigate();
    const defaultTitle = "Favorites";
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [title, setTitle] = useState(defaultTitle);

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
        navigate(`/${target}`, { replace: true });
    }

    const onFavoritesClick = (id: string) => {
        console.log('onFavoritesClick', id)
        navigate(`/details/${id}`, { replace: true });
    }

    const onFavoritesChanged = (favorites: Anime[]) => {
        console.log('onFavoritesChanged', favorites);
        setTitle("Favorites");
    }

    const onDetailsChanged = (details: DetailsProps) => {
        console.log('onDetailsChanged', details);
        setTitle(details.title || defaultTitle);
    }

    return (
        <StyledAppContainer>
            <Header
                title={title}
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
                    <Route path="/" element={<Favorites onTileClick={onFavoritesClick} onPropsChange={onFavoritesChanged} />} />
                    <Route path="/favorites" element={<Favorites onTileClick={onFavoritesClick} onPropsChange={onFavoritesChanged} />} />
                    {/*<Route path="/history" />*/}
                    <Route path="/details/:id" element={<Details onPropsChange={onDetailsChanged} />} />
                </Routes>
            </Content>
        </StyledAppContainer>
    );
}
