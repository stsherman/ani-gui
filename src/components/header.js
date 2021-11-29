class Header extends Base {
    static get observedAttributes() {
        return ['title', 'search-results'];
    }

    setTitle(title) {
        this.setAttribute('title', title);
    }

    onTitleChanged(title) {
        this.querySelector('#title').innerText = title;
    }

    onSearchResultsChanged(searchResults) {
        console.log(searchResults);
        if (!searchResults) {
            this.querySelector('#search-results').innerHTML = '';
            return;
        }
        this.querySelector('#search-results').innerHTML = JSON.parse(searchResults).map(x => `
            <span data-id="${x.id}" title="${x.name}"><img src="${x.image}"/><label>${x.name}</label></span>
        `).join('') || `
                <span class="empty-results">No results found</span>
            `;
    }

    style() {
        return css`
          ani-viewer-header header {
            display: flex;
            width: 100%;
            align-items: center;
          }

          ani-viewer-header #menu {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 16px;
          }

          ani-viewer-header #title {
            font-size: 28px;
            font-weight: bold;
            flex-grow: 1;
          }

          ani-viewer-header #search {
            /*flex-grow: 1;*/
            /*text-align: right;*/
          }

          ani-viewer-header #search input {
            background: transparent;
            outline: none;
            border: 0;
            color: inherit;
            padding: 8px 0;
          }

          ani-viewer-header #search > span {
            height: 36px;
            border-radius: 4px;
            background: #545454;
            display: flex;
            padding: 0 8px;
            align-items: center;
            cursor: pointer;
          }

          ani-viewer-header #menu .material-icons,
          ani-viewer-header #search .material-icons {
            cursor: pointer;
          }

          ani-viewer-header #search-results {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            background: #545454;
            display: flex;
            flex-direction: column;
            border-radius: 4px;
          }

          ani-viewer-header #search-results img {
            width: 28px;
            height: 28px;
            object-fit: cover;
            margin: 4px 8px;
          }

          ani-viewer-header #search-results > span:first-of-type {
            margin-top: 4px;
          }

          ani-viewer-header #search-results > span:last-of-type {
            margin-bottom: 4px;
          }

          ani-viewer-header #search-results > span {
            display: flex;
            align-items: center;
          }

          ani-viewer-header #search-results > span:not(.empty-results) {
            cursor: pointer;
          }

          ani-viewer-header #search-results > span > label {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            flex-basis: calc(100% - 56px);
            cursor: pointer;
            pointer-events: none;
          }

          ani-viewer-header #search-results > span:not(.empty-results):hover,
          ani-viewer-header #search-results > span:not(.empty-results):active,
          ani-viewer-header #search-results > span:not(.empty-results):focus,
          ani-viewer-header #search-results > span:not(.empty-results):focus-within {
            background: #727171;
          }

          ani-viewer-header #search > div {
            position: relative;
          }

          ani-viewer-header #search-results .empty-results {
            padding: 8px 16px;
            justify-content: center;
          }
        `;
    }

    triggerSearch() {
        const query = this.querySelector('#search input').value;
        if (query)
            this.dispatchEvent(new CustomEvent('search', {bubbles: true, detail: {query}}));
        else this.removeAttribute('search-results');
    }

    showDetails({target}) {
        const id = target.dataset['id'];
        this.dispatchEvent(new CustomEvent('show-details', {bubbles: true, detail: {id}}));
        this.querySelector('#search input').value = '';
        this.removeAttribute('search-results');
    }

    onMenuClick() {
        this.dispatchEvent(new Event('menu-click', {bubbles: true}));
    }

    onConnected() {
        let timer;
        this.querySelector('#menu .material-icons')
            .addEventListener('click', () => this.onMenuClick());
        this.querySelector('#search .material-icons')
            .addEventListener('click', () => this.triggerSearch());
        this.querySelector('#search input')
            .addEventListener('input', (e) => {
                timer && clearInterval(timer);
                timer = setTimeout(() => {
                    this.triggerSearch();
                }, 1000);
            });
        this.querySelector('#search-results')
            .addEventListener('click', (e) => this.showDetails(e));
        document.addEventListener('click', (e) => {
            if (!e.path.find(x => x.matches && x.matches('#search')))
                this.removeAttribute('search-results');
        });
    }

    render() {
        return html`
            <header>
                <div id="menu">
                    <span class="material-icons">menu</span>
                </div>
                <div id="title">${this.title}</div>
                <div id="search">
                    <span>
                        <input type="text" placeholder="Search anime"/>
                        <span class="material-icons">search</span>
                    </span>
                    <div>
                        <div id="search-results"></div>
                    </div>
                </div>
            </header>
        `;
    }
}

try {
    customElements.define('ani-viewer-header', Header);
} catch (e) {
}