import {createContext, Dispatch, ProviderProps, SetStateAction, useContext, useState} from "react";

type AppContextType = [AppState, Dispatch<SetStateAction<AppState>>, (updateValues: Partial<AppState>) => void] | undefined;
const AppContext = createContext<AppContextType>(undefined);

export function AppProvider({ initialState, ...props }: { initialState?: AppState } & Partial<ProviderProps<AppContextType>>) {
    const [appState, setAppState] = useState<AppState>(initialState ? initialState : {
        isLoaderShowing: false,
        isSideNavOpen: false,
        title: undefined,
    });

    const updateAppState = (updateValues: Partial<AppState>) => {
        setAppState({
            ...(appState || {}),
            ...updateValues
        });
    };

    return <AppContext.Provider
        value={[appState, setAppState, updateAppState]}
        {...props}
    />;
}

export default function useAppContext() {
    const appContext = useContext(AppContext);

    if (!appContext) {
        throw new Error("useAppContext must be used within an AppProvider");
    }

    return appContext;
}