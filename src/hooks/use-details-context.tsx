import {createContext, Dispatch, ProviderProps, SetStateAction, useContext, useState} from "react";

type DetailsContextType = [DetailsState | undefined, Dispatch<SetStateAction<DetailsState | undefined>>] | undefined;
const DetailsContext = createContext<DetailsContextType>(undefined);

export function DetailsProvider({ initialState, ...props }: { initialState?: DetailsState } & Partial<ProviderProps<DetailsContextType>>) {
    const [detailsState, setDetailsState] = useState<DetailsState | undefined>(initialState);

    return <DetailsContext.Provider
        value={[detailsState, setDetailsState]}
        {...props}
    />;
}

export default function useDetailsContext() {
    const detailsContext = useContext(DetailsContext);

    if (!detailsContext) {
        throw new Error("useDetailsContext must be used within an DetailsProvider");
    }

    return detailsContext;
}