'use client'

import useSWR from "swr"
import { useSession } from "next-auth/react"
import Link from "next/link"
import styles from "./userPosts.module.css"
import { RiEyeLine, RiDeleteBin2Line } from '@remixicon/react'
import { fetcher } from "@/utils/dataUtils"
import { useSortAndFilter } from "@/hooks/SortAndFilter"
import TableHeader from "@/components/tableHeader/TableHeader"
import { useRouter } from "next/navigation"
import { useState } from "react"
import SearchBar from "@/components/searchBar/SearchBar"
import { RiAddLine } from "@remixicon/react"
import TablePagination from "@/components/tablePagination/TablePagination"
import { Tooltip } from "react-tooltip"
import Notification from "@/components/notification/Notification"
// the code block below gets user posts and  displays them in a table

const UserPosts = () => {
    const router = useRouter();
    const { data: session, status: sessionStatus } = useSession();
    const { data: posts, error, mutate } = useSWR(
        session?.user?.id ? `/api/userposts?userId=${session.user.id}` : null, 
        fetcher
    );

    const columns = [
        { key: 'title', label: 'Title'},
        { key: 'status', label: 'Status' },
        { key: 'createdAt', label: 'Created At' },
        // Add more columns as needed
    ];

    const [ searchTerm, setSearchTerm] = useState('')
    const searchableColumns = [ 'title', 'status']

    const viewPost = async (slug) => {
        // redirect to post page
        router.push(`/posts/${slug}`)

    };

    const {
        fullProcessedData,
        paginatedData,
        sortConfig,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        handleSort,
    } = useSortAndFilter(
        posts || [],
        searchTerm,
        "createdAt",
        "asc",
        searchableColumns
    );

    const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());

    const handlePageChange = (direction) => {
        setCurrentPage((prevPage) => {
            if (direction === 'prev') {
                return Math.max(prevPage - 1, 1);
            } else if (direction === 'next') {
                const maxPage = Math.ceil(fullProcessedData.length / itemsPerPage);
                return Math.min(prevPage + 1, maxPage);
            }
            return prevPage;
        });
    };

    if (sessionStatus === 'loading') return <div>Loading session...</div>;
    if (!session?.user) return <div>Please sign in to view your posts.</div>;
    
    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <SearchBar searchTerm={searchTerm} onChange={handleSearchChange} />
                <Link href="/dashboard/creator/createpost" className={styles.addButton}><RiAddLine /> <span>New Post</span></Link>
            </div>
            <div className={styles.tableContainer}>
                {error && <div>Error: {error.message}</div>}
                {!fullProcessedData && <div>Loading posts...</div>}
                {paginatedData && (
                    <table className={styles.table}>
                        <TableHeader columns={columns} sortConfig={sortConfig} onSort={handleSort}/>
                        <tbody className={styles.tableBody}>
                            {paginatedData.map((post, index) => (
                                <tr key={post.id}>
                                    <td>{index + 1}</td>
                                    <td>{post.title}</td>
                                    <td className={`${styles[post.status]}`}>{post.status}</td>
                                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                    <td className={styles.action}>
                                        <RiEyeLine id="view-post" size={24} className={styles.viewButton} onClick={() => viewPost(post.slug)}/>
                                        <RiDeleteBin2Line id="delete-post" className={styles.deleteButton} />
                                        <Tooltip anchorSelect='#view-post' content='View Post' style={{ backgroundColor: "#4caf50", color: "#ffffff", }}/>
                                        <Tooltip 
                                            anchorSelect='#delete-post' 
                                            content='Delete Post'
                                            style={{ backgroundColor: "#F44336", color: "#ffffff", }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {/* Pagination Controls */}
                <TablePagination 
                    currentPage={currentPage}
                    totalItems={fullProcessedData.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>
            
        </div>
    );
};

export default UserPosts;