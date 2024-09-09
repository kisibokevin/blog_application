import { useState, useMemo, useCallback, useEffect } from 'react';

export const useSortAndFilter = (data, searchTerm = '', initialSortKey = '', initialSortOrder = 'asc', searchableColumns = [], itemsPerPage = 10) => {
    const [sortConfig, setSortConfig] = useState({ key: initialSortKey, order: initialSortOrder });
    const [currentPage, setCurrentPage] = useState(1);

    // Search filtering logic
    const filteredData = useMemo(() => {
        if (!searchTerm) return data;

        return data.filter((item) => {
            return searchableColumns.some((column) => {
                const value = column.split('.').reduce((obj, key) => obj?.[key], item); // Handle nested keys like 'user.name'
                return value?.toString().toLowerCase().includes(searchTerm.toLowerCase());
            });
        });
    }, [data, searchTerm, searchableColumns]);

    // Sorting logic
    const processedData = useMemo(() => {
        return [...filteredData].sort((a, b) => {  // Copy array to avoid mutation
            if (!sortConfig.key) return 0;

            const aValue = sortConfig.key.split('.').reduce((obj, key) => obj?.[key], a);
            const bValue = sortConfig.key.split('.').reduce((obj, key) => obj?.[key], b);

            if (sortConfig.order === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }, [filteredData, sortConfig]);

    // Sort handler
    const handleSort = useCallback((key) => {
        setSortConfig((prevConfig) => ({
            key,
            order: prevConfig.order === 'asc' ? 'desc' : 'asc',
        }));
    }, []);

    // Pagination logic
    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return processedData.slice(startIndex, endIndex);
    }, [processedData, currentPage, itemsPerPage]);

    // Reset page on search term change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return {
        fullProcessedData: processedData,
        paginatedData,
        sortConfig,
        handleSort,
        currentPage,
        setCurrentPage,
        itemsPerPage,
    };
};
