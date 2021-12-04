import {useEffect} from "react";
import useAppContext from "./use-app-context";

export default function useShowLoader(conditionalDependency: any, updateState?: () => Partial<Omit<AppState, "isLoaderShowing">>) {
    const [appState, , updateAppState] = useAppContext();

    useEffect(() => {
        if (!conditionalDependency && !appState.isLoaderShowing) {
            updateAppState({isLoaderShowing: true, ...(updateState?.() || {})});
        }
        if (conditionalDependency && appState.isLoaderShowing) {
            updateAppState({isLoaderShowing: false, ...(updateState?.() || {})});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conditionalDependency, appState.isLoaderShowing]);
}