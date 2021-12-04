import {DependencyList, useEffect, useRef, useState} from "react";

export default function usePromise<T>(promiseGenerator: () => PromiseLike<T>, dependencies?: DependencyList) {
    const [promiseResult, setPromiseResult] = useState<T | undefined>(undefined);
    const componentIsMounted = useRef(true);

    useEffect(() => {
       return () => {
           componentIsMounted.current = false;
       };
    }, []);

    useEffect(() => {
        if (componentIsMounted.current) {
            setPromiseResult(undefined);
            promiseGenerator().then((result: T) => {
                if (componentIsMounted.current) {
                    setPromiseResult(result);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies || []);

    return promiseResult;
}