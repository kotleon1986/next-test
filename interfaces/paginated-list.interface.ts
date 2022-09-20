export interface PaginatedList<T> {
    total: number;
    pages: number;
    items: T[];
}
