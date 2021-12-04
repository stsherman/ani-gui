// eslint-disable-next-line no-extend-native
Array.prototype.first = function<T> (predicate?: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined {
    if (!this.length) {
        return undefined;
    }
    if (!predicate) {
        return this[0];
    }
    return this.find(predicate, thisArg);
}

// eslint-disable-next-line no-extend-native
Array.prototype.last = function<T> (predicate?: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined {
    if (!this.length) {
        return undefined;
    }
    if (!predicate) {
        return this[this.length - 1];
    }
    return this.reverse().find(predicate, thisArg);
}

const module = {};

export default module;