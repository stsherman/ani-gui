// @ts-ignore
class History extends Base {
    static get observedAttributes() {
        return ['favorites'];
    }

    setHistory(history: Array<HistoryModal>) {
        this.setAttribute('history', JSON.stringify(history));
    }

    onHistoryChanged(history: Array<HistoryModal>) {
        if (history) {
            this.removeChildren(':not(style)');
            this.append(...history.map(x => {
                const element = document.createElement('ani-viewer-history-tile');
                element.setAttribute('id', x.id);
                element.setAttribute('image', x.imageUrl);
                element.setAttribute('title', x.displayName);
                element.setAttribute('text', x.description.substr(0, 15));
                return element;
            }));
        }
    }

    css() {
        return css`
          ani-viewer-history {
            display: flex;
          }
        `;
    }

    html() {
        return html``;
    }
}

class HistoryTile extends Base {
    static get observedAttributes() {
        return ['id', 'image', 'title', 'text'];
    }

    onImageChanged(image: string) {
        this.querySelector('img').setAttribute('src', image);
    }

    onTitleChanged(title: string) {
        this.querySelector<HTMLSpanElement>('.title').innerText = title;
    }

    onTextChanged(text: string) {
        this.querySelector<HTMLSpanElement>('.text').innerText = text;
    }

    onTileClick() {
        this.dispatchEvent(new CustomEvent('show-details', {bubbles: true, detail: {id: this.id}}));
    }

    onConnected() {
        super.onConnected();
        this.classList.add('shadow');
        this.addEventListener('click', () => this.onTileClick());
    }

    css() {
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

    html() {
        return html`
            <div>
                <img />
                <span class="title"></span>
                <span class="text"></span>
            </div>
        `;
    }
}

try {
    // @ts-ignore
    customElements.define('ani-viewer-history', History);
    customElements.define('ani-viewer-history-tile', HistoryTile);
} catch (e) {
}
