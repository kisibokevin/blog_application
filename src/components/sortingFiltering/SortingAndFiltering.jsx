
import React from 'react';
import styles from './sortingFiltering.module.css';

const SortingAndFiltering = ({ sortOrder, filterStatus, onSortChange, onFilterChange }) => {

    return (
    <div className={styles.sortingBar}>
            Sort
        <div className={styles.sort}>
            <select value={sortOrder} onChange={onSortChange}>
                <option value="">Default</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
            Filter
        <div className={styles.filter}>
            <select value={filterStatus} onChange={onFilterChange}>
                <option value="" selected disabled hidden>Select</option>
                <option value="">Default</option>
                <option value="published">Published</option>
                <option value="pending">Pending</option>
            </select>
        </div>
    </div>
    )
};

export default SortingAndFiltering;