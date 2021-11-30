export function map<T extends Node, U>(list: NodeListOf<T>, func: (value: T, index: number, array: NodeListOf<T>) => U) {
    const mapped = [];
    for (let i = 0; i < list.length; i++) {
        mapped.push(func(list[i], i, list));
    }
    return mapped;
}

export function forEach<T extends Node>(list: NodeListOf<T>, func: (value: T, index: number, array: NodeListOf<T>) => void) {
    for (let i = 0; i < list.length; i++) {
        func(list[i], i, list);
    }
}
