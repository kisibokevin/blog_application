'use client'
import React, { useMemo, useState } from 'react';
import styles from './userManagement.module.css'
import Link from 'next/link';
import { RiEditLine, RiDeleteBinLine, RiAddLine } from "@remixicon/react";
import SearchBar from '@/components/searchBar/SearchBar';
import SortingAndFiltering from '@/components/sortingFiltering/SortingAndFiltering';
import TablePagination from '@/components/tablePagination/TablePagination';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';

import { fetcher, filterItems, sortItems, paginateItems } from '@/utils/dataUtils';
import TableHeader from '@/components/tableHeader/TableHeader';
import { useSortAndFilter } from '@/hooks/SortAndFilter';

const UserManagement = () => {

	const { data: session, status: sessionStatus } = useSession();
	const { data: users, error, mutate, isLoading } = useSWR('http://localhost:3000/api/users', fetcher);

	const columns = [
		{ key: 'name', label: 'Name' },
		{ key: 'email', label: 'Email'},
		{ key: 'role', label: 'Role' },
        // Add more columns as needed
	]

	const [ searchTerm, setSearchTerm ] = useState("");
    const [ currentPage, setCurrentPage ] = useState(1);
	const searchableColumns = [ 'title', 'email', 'role', 'name']
    const ITEMS_PER_PAGE = 10;

	const { sortedData, sortConfig, handleSort } = useSortAndFilter(users || [], searchTerm, 'created_at', 'asc', searchableColumns);
	const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

	const handlePageChange = (direction) => {
        setCurrentPage((prevPage) => {
            if (direction === 'prev') {
                return Math.max(prevPage - 1, 1);
            } else if (direction === 'next') {
                const maxPage = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
                return Math.min(prevPage + 1, maxPage);
            }
            return prevPage;
        });
    };

	const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        return sortedData.slice(startIndex, endIndex);

    },[sortedData, currentPage]);
	

	// Handle session errors
    if (error) {
        return <div>Error : {error.message}</div>
    }

    if (sessionStatus === "loading") return <div>Loading session...</div>;
    if (!session?.user) return <div>Please sign in to view your posts.</div>;
    

	return (
		<div className={styles.container}>
			<div className={styles.tableContainer}>
				<div className={styles.titleContainer}>
					<h3 className={styles.listTitle}>Users List</h3>
					<Link href='/dashboard/admin/addusers' className={styles.addButton}><RiAddLine size={18}/><span>New User</span></Link>
				</div>
				<div className={styles.searchContainer}>
					<SearchBar searchTerm={searchTerm} onChange={handleSearchChange}/>
				</div>
                <table className={styles.table}>
                    <TableHeader columns={columns} sortConfig={sortConfig} onSort={handleSort}/>
                    <tbody className={styles.tableBody}>
                        { isLoading ? (
							<tr>
                                <td colSpan="5">Loading Data...</td>
                            </tr>
						) : (
								paginatedUsers.length > 0 ?(
									paginatedUsers.map((user, index) => (
									<tr key={user._id}>
										<td>{index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}</td>
										<td>{user.name}</td>
										<td>{user.email}</td>
										<td>{user.role}</td>
										<td className={styles.action}>
											<RiEditLine size={24} className={styles.editButton}/>
											<RiDeleteBinLine size={24} className={styles.deleteButton}/>
										</td>
									</tr>
									))
                            ) : (
								<tr>
                                    <td colSpan="5">No users found</td>
                                </tr>
							)
						)}
                    </tbody>
                </table>
				<TablePagination 
					currentPage={currentPage}
					totalItems={sortedData.length}
					itemsPerPage={ITEMS_PER_PAGE}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	)
}

export default UserManagement