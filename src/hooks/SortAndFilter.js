'use client'
// hooks/useSortableTable.js

import { useState, useMemo } from 'react';

export const useSortAndFilter = (data, searchTerm = '', initialSortKey = '', initialSortOrder = 'asc', searchableColumns = []) => {
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

    const handleSort = (key) => {
        let order = 'asc';
        if (sortConfig.key === key && sortConfig.order === 'asc') {
            order = 'desc';
        }
        setSortConfig({ key, order });
    };

    return { sortedData, sortConfig, handleSort };
};
