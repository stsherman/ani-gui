import {createContext, Dispatch, ProviderProps, SetStateAction, useContext, useState} from "react";

type DetailsContextType = [DetailsState, Dispatch<SetStateAction<DetailsState>>] | undefined;
const DetailsContext = createContext<DetailsContextType>(undefined);

export function DetailsProvider({ initialState, ...props }: { initialState?: DetailsState } & Partial<ProviderProps<DetailsContextType>>) {
    const [detailsState, setDetailsState] = useState<DetailsState>(initialState ? initialState : {
        description: "",
        episodes: [],
        genres: [],
        imageSrc: "",
        isFavorite: false,
        status: "",
        title: "",
        type: "",
    });

    return <DetailsContext.Provider
        value={[detailsState, setDetailsState]}
        {...props}
    />;
}

export default function useDetailsContext() {
    const detailsContext = useContext(DetailsContext);

    if (!detailsContext) {
        throw "useDetailsContext must be used within an DetailsProvider";
    }

    return detailsContext;
}