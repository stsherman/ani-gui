interface HistoryTileProps {
    id: string;
    imageUrl: string;
    displayName: string;
    description: string;
    onClick?: () => void;
}

interface HistoryProps {
    // history: HistoryTileProps[];
    onTileClick: (id: string) => void;
}