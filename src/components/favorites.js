class Favorites extends Base {
    static get observedAttributes() {
        return ['favorites'];
    }

    setFavorites(favorites) {
        this.setAttribute('favorites', JSON.stringify(favorites));
    }

    onFavoritesChanged(favorites) {
        if (favorites) {
            favorites = JSON.parse(favorites);
            this.removeChildren(':not(style)');
            this.append(...favorites.map(x => {
                const element = document.createElement('ani-viewer-favorites-tile');
                element.setAttribute('id', x.Id);
                element.setAttribute('image', x.ImageUrl);
                element.setAttribute('title', x.DisplayName);
                element.setAttribute('text', x.Description.substr(0, 15));
                return element;
            }));
        }
    }

    style() {
        return css`
          ani-viewer-favorites {
            display: flex;
          }
        `;
    }

    render() {
        return html``;
    }
}

class FavoritesTile extends Base {
    static get observedAttributes() {
        return ['id', 'image', 'title', 'text'];
    }

    onImageChanged(image) {
        this.querySelector('img').setAttribute('src', image);
    }

    onTitleChanged(title) {
        this.querySelector('.title').innerText = title;
    }

    onTextChanged(text) {
        this.querySelector('.text').innerText = text;
    }

    onTileClick() {
        this.dispatchEvent(new CustomEvent('show-details', {bubbles: true, detail: {id: this.id}}));
    }

    onConnected() {
        super.onConnected();
        this.classList.add('shadow');
        this.addEventListener('click', () => this.onTileClick());
    }

    style() {
        return css`
          ani-viewer-favorites-tile {
            padding: 2px;  
          }

          ani-viewer-favorites-tile:hover {
            border: 2px solid #FFFFFF;
            padding: 0;
          }
          
          ani-viewer-favorites-tile > div {
            display: flex;
            flex-direction: column;
            width: 180px;
            background: #474747;
            cursor: pointer;
          }

          ani-viewer-favorites-tile img {
            width: 180px;
            height: 232px;
            object-fit: cover;
          }

          ani-viewer-favorites-tile .title {
            font-size: 14px;
            font-weight: bold;
            padding: 8px 8px 4px;
          }

          ani-viewer-favorites-tile .text {
            font-size: 12px;
            padding: 4px 8px 8px;
          }
        `;
    }

    render() {
        return html`
            <div>
                <img src="${this.image}"/>
                <span class="title">${this.title}</span>
                <span class="text">${this.text}</span>
            </div>
        `;
    }
}

try {
    customElements.define('ani-viewer-favorites', Favorites);
    customElements.define('ani-viewer-favorites-tile', FavoritesTile);
} catch (e) {
}
