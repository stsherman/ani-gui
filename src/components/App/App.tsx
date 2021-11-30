import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Favorites from "../Favorites/Favorites";
import Content from "../Content/Content";


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
        <div id="app">
            <Header
                title={"Favorites"}
                onSearchClick={onSearchClick}
                onMenuClick={onMenuClick}
            />
            <Content>
                <Favorites /> 
            </Content>
        </div>
    );
}
