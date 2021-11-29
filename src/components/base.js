class Base extends HTMLElement {
    deferrable = new Deferrable();
    connectedCallback() {
        let content = this.render();
        const template = document.createElement('template');
        let style = this.style();
        if (style.length) {
            style = `<style>${style}</style>`;
        }
        template.innerHTML = `
            ${style}
            ${content.outerHTML || content}
        `;
        this.appendChild(template.content.cloneNode(true));
        this.onConnected();
        this.isInitialized = true;
        this.deferrable.execute();
    }

    onConnected() {}

    render() {
        return html``;
    }

    style() {
        return css``;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this.isInitialized) {
            this.deferrable.add(() => this.attributeChangedCallback(name, oldValue, newValue));
            return;
        }
        const funcName = `on${name.replace(/^(\w)|-(\w)|_(\w)/g, v => v.toUpperCase()).replace(/[_\-]/g, '')}Changed`;
        if (oldValue !== newValue && typeof this[funcName] === 'function') {
            this[funcName](newValue);
        }
    }
}