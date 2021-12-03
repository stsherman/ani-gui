import {createContext, Dispatch, Props, ProviderProps, SetStateAction, useContext, useState} from "react";

type AppContextType = [AppState, Dispatch<SetStateAction<AppState>>] | undefined;
const AppContext = createContext<AppContextType>(undefined);

export function AppProvider({ initialState, ...props }: { initialState?: AppState } & Partial<ProviderProps<AppContextType>>) {
    const [appState, setAppState] = useState<AppState>(initialState ? initialState : {
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
        throw "useAppContext must be used within an AppProvider";
    }

    return appContext;
}