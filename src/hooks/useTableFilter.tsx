interface TableFilterProps<T> {
    data: T[],
    searchQuery: string,
    sortField: keyof T,
    sortDirection?: 'asc' | 'desc',
    searchFields?: (keyof T)[]
}

const useTableFilter = <T extends Record<string, any>>({
    data,
    searchQuery,
    sortField,
    sortDirection = 'asc',
    searchFields
}: TableFilterProps<T>) => {
    const filteredAndSortedData = data
        .filter((item) => {
            if (!searchQuery) return true;
            const searchLower = searchQuery.toLowerCase();
            if (searchFields && searchFields.length > 0) {
                return searchFields.some(field => {
                    const value = item[field];
                    return typeof value === 'string' && value.toLowerCase().includes(searchLower);
                });
            }
            return Object.values(item).some(
                value => typeof value === 'string' && value.toLowerCase().includes(searchLower)
            );
        })
        .sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];
            const modifier = sortDirection === 'asc' ? 1 : -1;
            
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return aValue.localeCompare(bValue) * modifier;
            } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
                return (aValue === bValue ? 0 : aValue ? -1 : 1) * modifier;
            } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                return (aValue - bValue) * modifier;
            }
            
            return 0;
        });
    
    return { filteredAndSortedData };
};

export default useTableFilter;