class Content extends Base {
    setContent(content) {
        this.removeChildren(`ani-viewer-content > :not(style)`);
        this.appendChild(content);
    }

    style() {
        return css`
            ani-viewer-content {
                height: 100%;
                overflow: auto;
            }
            ani-viewer-content::-webkit-scrollbar {
              width: 4px;
            }
            
            ani-viewer-content::-webkit-scrollbar-thumb {
              background-color: #b7b7f9;
              border-radius: 20px;
            }
        `;
    }

    render() {
        return html``;
    }
}

try {
    customElements.define('ani-viewer-content', Content);
} catch (e) {}
