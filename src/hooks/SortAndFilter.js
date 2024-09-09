'use client'

import { useState, useMemo, useCallback } from 'react';

export const useSortAndFilter = (data, searchTerm = '', initialSortKey = '', initialSortOrder = 'asc', searchableColumns = [], itemsPerPage = 10) => {
    const [sortConfig, setSortConfig] = useState({ key: initialSortKey, order: initialSortOrder });

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
    const sortedData = useMemo(() => {
        return filteredData.sort((a, b) => {
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

    const handleSort = useCallback((key) => {
        setSortConfig({
            key,
            order: sortConfig.order === "asc" ? "desc" : "asc",
        });
    }, [ sortConfig.order ]);

    // pagination logic
    const [currentPage, setCurrentPage] = useState(1);

    const paginatedData = useMemo( () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return sortedData.slice(startIndex, endIndex);
    }, [ sortedData, currentPage, itemsPerPage ])

    return {
        sortedData,
        sortConfig,
        handleSort,
        paginatedData,
        currentPage,
        setCurrentPage,
        itemsPerPage,
    };
};
