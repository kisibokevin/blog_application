

import React from 'react';
import { RiArrowUpDownLine, RiArrowDownSLine, RiArrowUpSLine } from "@remixicon/react";
// styles from './tableHeader.module.css';

const TableHeader = ({ columns, sortConfig, onSort }) => {
    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.order === 'asc' ? <RiArrowUpSLine size={18}/> : <RiArrowDownSLine size={18} />;
        }
        return <RiArrowUpDownLine />;
    };

    return (
        <thead>
            <tr>
                <th>#</th>
                {columns.map((column) => (
                    <th key={column.key} onClick={() => onSort(column.key)}>
                        {column.label} {getSortIcon(column.key)}
                    </th>
                ))}
                <th>Actions</th>
            </tr>
        </thead>
    );
};

export default TableHeader;
