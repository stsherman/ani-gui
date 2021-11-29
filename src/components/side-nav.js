class SideNav extends Base {
    style() {
        return css`
          ani-viewer-side-nav {
            position: absolute;
            transition: left 300ms ease-in-out;
            left: 0;
            top: 0;
            bottom: 0;
            display: flex;
          }

          ani-viewer-side-nav[is-open=true] {
            right: 0;
          }

          ani-viewer-side-nav:not([is-open=true]) {
            left: -100vw;
          }

          ani-viewer-side-nav #side-nav-content {
            background: #343434;
            width: 200px;
            box-shadow: 0 0 2px 1px #323232;
          }

          ani-viewer-side-nav:not([is-open=true]) #side-nav-background {
            opacity: 0;
          }

          ani-viewer-side-nav #side-nav-background {
            transition: opacity 300ms ease-in-out;
            flex-grow: 1;
            opacity: 0.75;
            background: #262626;
          }

          ani-viewer-side-nav li {
            cursor: pointer;
          }
        `;
    }

    close() {
        this.removeAttribute('is-open');
    }

    open() {
        this.setAttribute('is-open', 'true');
    }

    onItemClick({target}) {
        this.close();
        this.dispatchEvent(new CustomEvent('show-content', {bubbles: true, detail: {target: target.dataset.target}}));
    }

    onConnected() {
        this.querySelector('ani-viewer-side-nav #side-nav-background')
            .addEventListener('click', () => this.close());
        this.querySelector('ani-viewer-side-nav ul')
            .addEventListener('click', (e) => this.onItemClick(e));
    }

    render() {
        return html`
            <div id="side-nav-content">
                <ul>
                    <li data-target="favorites">Favorites</li>
                    <li data-target="history">History</li>
                </ul>
            </div>
            <div id="side-nav-background"></div>
        `;
    }
}

try {
    customElements.define('ani-viewer-side-nav', SideNav);
} catch (e) {
}
