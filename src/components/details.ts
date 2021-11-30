class Details extends Base {
    static get observedAttributes() { return ['details']; }

    setDetails(details: DetailsModal) {
        this.setAttribute('details', JSON.stringify(details));
    }

    onDetailsChanged(details: DetailsModal) {
        if (details) {
            this.querySelector<HTMLImageElement>('#image').src = details.image;
            this.querySelector<HTMLSpanElement>('#type').innerText = details.type;
            this.querySelector<HTMLParagraphElement>('#description').innerText
                = details['plot summary'];
            this.querySelector('#genres').append(...details.genre.split(',').map(x => {
                const pill = document.createElement('span');
                pill.classList.add('pill', 'shadow', 'mb8');
                pill.innerText = x;
                return pill;
            }));
            this.querySelector<HTMLSpanElement>('#status').innerText = details.status;
            this.querySelector<HTMLSpanElement>('#episodes span').innerText
                = JSON.stringify(details.episodes);
            this.querySelector<HTMLSpanElement>('.star').style.color
                = details.isFavorite ? '#ffd500' : '#FFFFFF';
        }
    }

    css() {
        return css`
          ani-viewer-details #image {
            width: 350px;
            height: 460px;
            object-fit: cover;
          }
          ani-viewer-details #details {
            display: flex;
          }
          ani-viewer-details {
            display: flex;
            flex-direction: column;
          }
          ani-viewer-details .row .spacer {
            flex-grow: 1;
          }
          ani-viewer-details .star {
            display: flex;
            align-items: center;
          }
        `;
    }

    html() {
        return html`
            <div id="details" class="row">
                <img id="image" />
                <div class="column pl16">
                    <div class="row">
                        <span class="pill shadow" id="status"></span>
                        <span class="pill shadow" id="type"></span>
                        <span class="spacer"></span>
                        <span class="material-icons star">star</span>
                    </div>
                    <p id="description"></p>
                    <div id="genres" class="row wrap"></div>
                </div>
            </div>
            <div id="episodes" class="row">
                <label>Episodes:</label>
                <span></span>
            </div>
        `;
    }
}

try {
    customElements.define('ani-viewer-details', Details);
} catch (e) {}
