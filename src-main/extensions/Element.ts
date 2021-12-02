Element.prototype.querySelectorRequired = function<K extends Element = Element>(selectors: string): K {
    const element = this.querySelector<K>(selectors);
    if (!element) throw "";
    return element;
}

DocumentFragment.prototype.querySelectorRequired = function<K extends Element = Element>(selectors: string): K {
    const element = this.querySelector<K>(selectors);
    if (!element) throw "";
    return element;
}

export default {};