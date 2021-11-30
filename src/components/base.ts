class Base extends HTMLElement {
    private deferrable: Deferrable = new Deferrable();
    private isInitialized: Boolean = false;

    connectedCallback() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>${this.css()}</style>
            ${this.html()}
        `;
        this.appendChild(template.content.cloneNode(true));
        this.onConnected();
        this.isInitialized = true;
        this.deferrable.execute();
    }

    onConnected() {}

    html() {
        return html``;
    }

    css() {
        return css``;
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (!this.isInitialized) {
            this.deferrable.add(() => this.attributeChangedCallback(name, oldValue, newValue));
            return;
        }
        const funcName = `on${name.replace(/^(\w)|-(\w)|_(\w)/g, v => v.toUpperCase()).replace(/[_\-]/g, '')}Changed`;
        // @ts-ignore
        const func = this[funcName];
        if (oldValue !== newValue && typeof func === 'function') {
            try {
                func(JSON.parse(newValue));
            } catch (e) {
                func(newValue);
            }
        }
    }
}