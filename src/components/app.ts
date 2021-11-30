class App extends Base {
    css() {
        return css`
          ani-viewer-app {
            display: flex;
            flex-direction: column;
            position: relative;
            height: 100%;
            padding: 16px;
            min-width: 740px;
            max-width: 1100px;
            margin: auto;
          }

          ani-viewer-app ani-viewer-content {
            margin-top: 8px;
          }
        `;
    }

    get header(): Header {
        return this.querySelector('ani-viewer-header');
    }

    get sideNav(): SideNav {
        return this.querySelector('ani-viewer-side-nav');
    }

    get content(): Content {
        return this.querySelector('ani-viewer-content');
    }

    async onSearchClick({detail}: CustomEvent) {
        console.log('search clicked', detail.query);
        const searchResult = await window.electron.search(detail.query);
        this.header.setAttribute('search-results', JSON.stringify(searchResult));
    }

    onMenuClick() {
        this.sideNav.open();
    }

    async showDetails({detail}: CustomEvent) {
        const details = await window.electron.details(detail.id);
        details.isFavorite = await window.electron.isFavorite(detail.id);

        const detailsElement = document.createElement('ani-viewer-details');
        // @ts-ignore
        detailsElement.setDetails(details);

        this.content.setContent(detailsElement);
        this.header.setTitle(details.title);
    }

    async showFavorites() {
        const favorites = await window.electron.getFavorites();
        const favoritesElement = document.createElement('ani-viewer-favorites');
        // @ts-ignore
        favoritesElement.setFavorites(favorites);
        this.content.setContent(favoritesElement);
        this.header.setTitle('Favorites');
    }

    async showHistory() {
        const history = await window.electron.getHistory();
        const historyElement = document.createElement('ani-viewer-history');
        // @ts-ignore
        historyElement.setHistory(history);
        this.content.setContent(historyElement);
        this.header.setTitle('History')
    }

    async showContent({detail}: CustomEvent) {
        switch (detail.target) {
            case 'favorites':
                await this.showFavorites();
                break;
            case 'history':
                await this.showHistory();
                break;
        }
    }

    async onConnected() {
        this.addEventListener('menu-click', e => this.onMenuClick());
        this.addEventListener('search', async (e: CustomEvent) => await this.onSearchClick(e));
        this.addEventListener('show-details', async (e: CustomEvent) => await this.showDetails(e));
        this.addEventListener('show-content', async (e: CustomEvent) => await this.showContent(e));

        await this.showFavorites();
    }

    html() {
        return html`
            <ani-viewer-header title="Favorites"></ani-viewer-header>
            <ani-viewer-side-nav></ani-viewer-side-nav>
            <ani-viewer-content class="pt8">
                <ani-viewer-favorites></ani-viewer-favorites>
            </ani-viewer-content>
        `;
    }
}

try {
    customElements.define('ani-viewer-app', App);
} catch (e) {
}
