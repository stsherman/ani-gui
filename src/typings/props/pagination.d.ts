interface PaginationProps {
    minPage: number,
    maxPage: number,
    activePage: number,
    onNavigate?: (page: number) => void,
}