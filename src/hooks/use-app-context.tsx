import {createContext, Dispatch, ProviderProps, SetStateAction, useContext, useState} from "react";

type AppContextType = [AppState, Dispatch<SetStateAction<AppState>>] | undefined;
const AppContext = createContext<AppContextType>(undefined);

export function AppProvider({ initialState, ...props }: { initialState?: AppState } & Partial<ProviderProps<AppContextType>>) {
    const [appState, setAppState] = useState<AppState>(initialState ? initialState : {
        isLoaderShowing: false,
        isSideNavOpen: false,
        title: "Favorites",
    });

    return <AppContext.Provider
        value={[appState, setAppState]}
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