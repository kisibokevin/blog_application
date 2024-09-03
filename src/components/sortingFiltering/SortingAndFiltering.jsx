
import React from 'react';
import styles from './sortingFiltering.module.css';

const SortingAndFiltering = ({ sortOrder, filterStatus, onSortChange, onFilterChange }) => {

    return (
    <div className={styles.sortingBar}>
        <div className={styles.sort}>
            <select value={sortOrder} onChange={onSortChange}>
                <option value="">Sort</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
        <div className={styles.filter}>
            <select value={filterStatus} onChange={onFilterChange}>
                <option value="">Filter</option>
                <option value="published">Published</option>
                <option value="pending">Pending</option>
            </select>
        </div>
    </div>
    )
};

export default SortingAndFiltering;