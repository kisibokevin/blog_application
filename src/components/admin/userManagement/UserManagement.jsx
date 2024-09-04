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

const UserManagement = () => {

	const { status } = useSession();

	const [ searchTerm, setSearchTerm ] = useState("");
    const [ sortOrder, setSortOrder ] = useState('asc');
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ filterStatus, setFilterStatus ] = useState('');
    const ITEMS_PER_PAGE = 10;

	// fetching users from api
	const { data: users, error, mutate, isLoading } = useSWR('http://localhost:3000/api/users', fetcher);


	const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
    const handleSortChange = (e) => setSortOrder(e.target.value);
    const handleFilterChange = (e) => setFilterStatus(e.target.value);

	const handlePageChange = (direction) => {
        if (direction === 'prev') {
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        } else {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

	const filteredUsers = useMemo(() => {
		if (!users) return  [];
		
		return sortItems(
			filterItems( 
				users, 
				searchTerm, 
				filterStatus, 
				['name','email', 'role']), 
				'created_at', 
				sortOrder
			);
	}, [users, searchTerm, sortOrder, filterStatus]);

	const paginatedUsers = useMemo(
		() => paginateItems(
			filteredUsers, 
			currentPage, 
			ITEMS_PER_PAGE), 
			[filteredUsers, currentPage, ITEMS_PER_PAGE]
		);

    // Handle session errors
    if (error) {
        return <div>Error : {error.message}</div>
    }

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status!== 'authenticated') {
        return <Link href='/login'>Login to Access Dashboard</Link>
    }

	// Handle session errors
    if (error) {
        return <div>Error : {error.message}</div>
    }

    if (status === 'loading') {
        return <p>Loading...</p>
    }

    if (status !== 'authenticated') {
        return <Link href='/login'>Login to Access Dashboard</Link>
    }

	return (
		<div className={styles.container}>
			<div className={styles.tableContainer}>
				<div className={styles.titleContainer}>
					<h3 className={styles.listTitle}>Users List</h3>
					<Link href='/dashboard/admin/addusers' className={styles.addButton}><RiAddLine size={18}/><span>New User</span></Link>
				</div>
				<div className={styles.searchContainer}>
					<SearchBar searchTerm={searchTerm} onChange={handleSearchChange}/>
					<SortingAndFiltering 
						sortOrder={sortOrder}
						filterStatus={filterStatus}
						onSortChange={handleSortChange}
						onFilterChange={handleFilterChange}
					/>
				</div>
                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                        <tr>
							<th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
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
					totalItems={filterItems.length}
					itemsPerPage={ITEMS_PER_PAGE}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	)
}

export default UserManagement