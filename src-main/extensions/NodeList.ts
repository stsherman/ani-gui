NodeList.prototype.map = function<T extends Node, U> (callbackfn: (value: T, index: number, array: NodeListOf<T>) => U, thisArg?: any): U[] {
    const mapped = [];
    for (let i = 0; i < this.length; i++) {
        mapped.push(callbackfn(this[i] as T, i, this as NodeListOf<T>));
    }
    return mapped;
}

NodeList.prototype.reduce = function <U, T extends Node>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: NodeListOf<T>) => U, initialValue: U): U {
    const mapper = typeof initialValue === "object" ? (value: U) => ({ ...value }) : (value: U) => value;
    let result = mapper(initialValue);
    for (let i = 0; i < this.length; i++) {
        result = callbackfn(result, this[i] as T, i, this as NodeListOf<T>);
        // result = mapper(callbackfn(result, this[i] as T, i, this as NodeListOf<T>));
    }
    return result;
}

export default {};