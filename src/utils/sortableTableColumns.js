'use client'

import { useState } from 'react';

export const useSortableTable = (data, initialSortKey = '', initialSortOrder = 'asc') => {
    const [sortConfig, setSortConfig] = useState({ key: initialSortKey, order: initialSortOrder });

    const sortedData = data.sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (sortConfig.order === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    const handleSort = (key) => {
        let order = 'asc';
        if (sortConfig.key === key && sortConfig.order === 'asc') {
            order = 'desc';
        }
        setSortConfig({ key, order });
    };

    return { sortedData, sortConfig, handleSort };
};
