interface Element {
    querySelectorRequired<K extends Element = Element>(selectors: string): K;
}
interface DocumentFragment {
    querySelectorRequired<K extends Element = Element>(selectors: string): K;
}