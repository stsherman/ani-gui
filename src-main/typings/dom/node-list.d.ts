interface NodeList {
    map: <T extends Node, U>(callbackfn: (value: T, index?: number, array?: NodeListOf<T>) => U, thisArg?: any) => U[];
    reduce: <U, T extends Node>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: NodeListOf<T>) => U, initialValue: U) => U;
    findIndex: <T extends Node>(predicate: (value: T, index?: number, obj?: NodeListOf<T>) => unknown, thisArg?: any) => number;
}
