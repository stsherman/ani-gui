class History extends Base {
    static get observedAttributes() {
        return ['favorites'];
    }

    setHistory(history) {
        this.setAttribute('history', JSON.stringify(history));
    }

    onHistoryChanged(history) {
        if (history) {
            history = JSON.parse(history);
            this.removeChildren(':not(style)');
            this.append(...history.map(x => {
                const element = document.createElement('ani-viewer-history-tile');
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
          ani-viewer-history {
            display: flex;
          }
        `;
    }

    render() {
        return html``;
    }
}

class HistoryTile extends Base {
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
          ani-viewer-history-tile {
            padding: 2px;  
          }

          ani-viewer-history-tile:hover {
            border: 2px solid #FFFFFF;
            padding: 0;
          }
          
          ani-viewer-history-tile > div {
            display: flex;
            flex-direction: column;
            width: 180px;
            background: #474747;
            cursor: pointer;
          }

          ani-viewer-history-tile img {
            width: 180px;
            height: 232px;
            object-fit: cover;
          }

          ani-viewer-history-tile .title {
            font-size: 14px;
            font-weight: bold;
            padding: 8px 8px 4px;
          }

          ani-viewer-history-tile .text {
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
    customElements.define('ani-viewer-history', History);
    customElements.define('ani-viewer-history-tile', HistoryTile);
} catch (e) {
}
