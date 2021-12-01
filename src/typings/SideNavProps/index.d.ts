interface SideNavProps {
    isOpen: boolean;
    onClose: () => void;
    onItemClick: (target: string) => void;
}

interface SideNavContainerProps {
    isOpen: boolean;
}

interface SideNavBackgroundProps {
    isOpen: boolean;
}