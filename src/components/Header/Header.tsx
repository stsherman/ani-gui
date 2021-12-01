import React, {createRef} from 'react';
import './Header.css';

export default function Header({title, onSearchClick, onMenuClick}: Partial<HeaderProps>) {
    const inputRef = createRef<HTMLInputElement>();
    const triggerSearch = () => {
        const query = inputRef.current?.value;
        if (query) onSearchClick?.(query);
    }
    return (
        <header className="app-header">
            <div id="menu">
                <span className="material-icons" onClick={onMenuClick}>menu</span>
            </div>
            <div id="title">{title}</div>
            <div id="search">
                    <span>
                        <input type="text" placeholder="Search anime" ref={inputRef}/>
                        <span className="material-icons" onClick={triggerSearch}>search</span>
                    </span>
                <div>
                    <div id="search-results" />
                </div>
            </div>
        </header>
    );
}