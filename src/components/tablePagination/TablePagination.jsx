
import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import styles from './tablePagination.module.css';

const TablePagination = ({ currentPage, totalPosts, postsPerPage, onPageChange }) => {
    return (
        <div className={styles.pagination}>
            <RiArrowLeftSLine
                size={32}
                color='black'
                className={`${styles.prevIcon} ${styles.pButton}`}
                onClick={() => onPageChange('prev')}
                disabled={currentPage === 1}
            />
            <div className={styles.paginationCounter}>
                <span>Page {currentPage}</span>
            </div>
            <RiArrowRightSLine
                size={32}
                color='black'
                className={`${styles.nextIcon} ${styles.pButton}`}
                onClick={() => onPageChange('next')}
                disabled={currentPage * postsPerPage >= totalPosts}
            />
        </div>
    );
};

export default TablePagination;