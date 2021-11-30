import React, {useEffect, useState} from 'react';
import './Favorites.css';
import { FavoritesProps, FavoritesTileProps } from "./Favorites.d";

function FavoritesTile({id, imageUrl, displayName, description}: Partial<FavoritesTileProps>) {
    return (
        <div className="app-favorites-tile">
            <div>
                <img src={imageUrl} />
                <span className="title">{displayName}</span>
                <span className="text">{description}</span>
            </div>
        </div>
    );
}

export default function Favorites() {
    const [favorites, setFavorites] = useState([] as FavoritesTileProps[]);

    async function getFavorites() {
        // @ts-ignore
        const f = await window.api.getFavorites();
        console.log('f', f);
        setFavorites(f);
    }

    useEffect(() => {
        console.log('getting favorites');
        getFavorites();
    }, []);

    return (
        <div className="app-favorites">
            {console.log('favorites', favorites)}
            {favorites?.map(favorite => (<FavoritesTile
                id={favorite.id}
                imageUrl={favorite.imageUrl}
                displayName={favorite.displayName}
                description={favorite.description.substr(0, 15)}
            />))}
        </div>
    );
}