interface Array {
    first: <T>(predicate?: (value: T, index: number, obj: T[]) => unknown, thisArg?: any) => T | undefined;
    last: <T>(predicate?: (value: T, index: number, obj: T[]) => unknown, thisArg?: any) => T | undefined;
}