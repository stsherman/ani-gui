Element.prototype.querySelectorRequired = function<K extends Element = Element>(selectors: string): K {
    const element = this.querySelector<K>(selectors);
    if (!element) throw new Error("Selector must return an element in querySelectorRequired");
    return element;
}

DocumentFragment.prototype.querySelectorRequired = function<K extends Element = Element>(selectors: string): K {
    const element = this.querySelector<K>(selectors);
    if (!element) throw new Error("Selector must return an element in querySelectorRequired");
    return element;
}
const module = {};

export default module;