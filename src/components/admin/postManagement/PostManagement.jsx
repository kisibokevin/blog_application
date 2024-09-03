'use client'

import React, { useState, useMemo } from 'react'
import styles from './postsmanagement.module.css'
import {
    RiSearchLine,
    RiEditLine,
    RiArrowDownSLine,
    RiArrowLeftSLine,
    RiArrowRightSLine,
    RiEyeLine,
    RiUploadLine,
    RiDownloadLine,
    RiDeleteBinLine
} from "@remixicon/react";
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ConfirmModal from '@/components/confirmModal/ConfirmModal'
import { Tooltip } from 'react-tooltip';
import Notification from '@/components/notification/Notification';
import { fetcher, filterPosts, sortPosts, paginatePosts } from '@/utils/postUtils';
import TablePagination from '@/components/tablePagination/TablePagination';
import SearchBar from '@/components/searchBar/SearchBar';
import SortingAndFiltering from '@/components/sortingFiltering/SortingAndFiltering';

const PostManagement = () => {
    /*
    * Fetch data from API, update state when data changes,
    * Render table with posts, pagination, search bar, sorting, filtering,
    * Add new post, view post, delete post, and pagination controls.
    */

    const { status } = useSession();
    const router = useRouter();

    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ postToDelete, setPostToDelete ] = useState(null);
    const [ notification, setNotification ] = useState({ message: '', type: '',});
    const [ searchTerm, setSearchTerm ] = useState("");
    const [ sortOrder, setSortOrder ] = useState('asc');
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ postsPerPage, setPostsPerPage ] = useState(10);
    const [ filterStatus, setFilterStatus ] = useState('');
    const POSTS_PER_PAGE = 10;

    // TODO: Fetch data from API
    const {
        data: posts,
        error,
        mutate,
        isLoading,
    } = useSWR("http://localhost:3000/api/admin", fetcher);

    //console.log(posts)

    const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
    const handleSortChange = (e) => setSortOrder(e.target.value);
    const handleFilterChange = (e) => setFilterStatus(e.target.value);

    // TODO: Implement publish post functionality
    const handlePublish = async (slug) => {
        // update post status in API and update state
        try {

            const res = await fetch(`http://localhost:3000/api/admin/${slug}`, {
                method: 'PUT',
                body: JSON.stringify({
                    status: 'published',
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to Publish Post')
            }

            mutate();
            setNotification({ message: 'Post Published Successfully', type: 'success' });
            
        } catch (err) {
            console.error('Error Publishing Post', err.message);
            setNotification({ message: 'Error Publishing Post', type: 'error' });
        }

    };

    // TODO: Implement UnPublish post functionality
    const handleUnpublish = async (slug) => {
        // update post status in API and update state
        try {

            const res = await fetch(`http://localhost:3000/api/admin/${slug}`, {
                method: 'PUT',
                body: JSON.stringify({
                    status: 'pending',
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to Unpublish Post')
            }

            mutate();
            setNotification({ message: 'Post Unpublished Successfully', type: 'success' });
            
        } catch (err) {
            console.error('Error UnPublishing Post', err.message);
            setNotification({ message: 'Error Unpublishing Post', type: 'error' });
        }
    };

    // TODO: Implement view post functionality
    const viewPost = async (slug) => {
        // redirect to post page
        router.push(`/posts/${slug}`)

    };

    // TODO: Implement delete post functionality through a modal
    const handleDelete = (slug) => {
        setPostToDelete(slug);
        setIsModalOpen(true);
    }

    const handleConfirmDelete = async () => {

        if(!postToDelete) return;
        try {

            const res = await fetch(`http://localhost:3000/api/admin/${postToDelete}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete Post')
            }

            mutate();
            setNotification({ message: 'Post Deleted Successfully', type: 'success' });

        } catch (error) {

            console.error('Error deleting post:', error);
            setNotification({ message: 'Error Deleting Post', type: 'error' });
        } finally {
            setIsModalOpen(false);
            setPostToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setPostToDelete(null);
    };

    const handlePageChange = (direction) => {
        if (direction === 'prev') {
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
        } else {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const filteredPosts = useMemo(() => {
        if (!posts) return [];
        return sortPosts(filterPosts(posts, searchTerm, filterStatus), sortOrder);
    }, [posts, searchTerm, sortOrder, filterStatus]);

    const paginatedPosts = useMemo(() => paginatePosts(filteredPosts, currentPage, 10), [filteredPosts, currentPage]);


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
            {notification.message && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ message: '', type: '' })}
                />
            )}
            <div className={styles.tableContainer}>
                <div className={styles.titleDiv}>
                    <h3 className={styles.listTitle}>Posts list</h3>
                    <Link href='/dashboard/admin/createpost' className={styles.addButton}><RiEditLine size={18}/><span>Create Post</span></Link>
                </div>
                <div className={styles.searchContainer}>
                    <SearchBar searchTerm={searchTerm} onChange={handleSearchChange} />
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
                            <th>S/NO</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {isLoading ? (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center' }}>Loading...</td>
                            </tr>
                        ) : (
                            paginatedPosts.length > 0 ? (
                                paginatedPosts.map(( post, index ) => (
                                    <tr key={post.id}>
                                        <td>{index + 1 + (currentPage - 1) * 10}</td>
                                        <td>{post.title}</td>
                                        <td>{post.user.name}</td>
                                        <td className={`${styles[post.status]}`}>{post.status}</td>
                                        <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                        <td className={styles.action}>
                                            <RiEyeLine id="view-post" size={24} className={styles.viewButton} onClick={() => viewPost(post.slug)}/>
                                            {post.status === 'pending' ? (
                                                <RiUploadLine id="publish-post" size={24} className={styles.publishButton} onClick={() => handlePublish(post.slug)}/>
                                                
                                            ) : (
                                                <RiDownloadLine id="unpublish-post" size={24} className={styles.unpublishButton} onClick={() => handleUnpublish(post.slug)}/>
                                            )}
                                            <RiDeleteBinLine id="delete-post" className={styles.deleteButton} onClick={() => handleDelete(post.slug)}/>
                                            {/*tooltips for view, publish & unpublish buttons */}
                                            <Tooltip anchorSelect='#view-post' content='View Post' style={{ backgroundColor: "#4caf50", color: "#ffffff", }}/>
                                            <Tooltip 
                                                anchorSelect='#publish-post'  
                                                content='Publish Post'
                                                style={{ backgroundColor: "#2196f3", color: "#ffffff", }}
                                            />
                                            <Tooltip anchorSelect='#unpublish-post' content='UnPublish PostPost' style={{ backgroundColor: "#ffc107", color: "#000000", }}/>
                                            <Tooltip 
                                                anchorSelect='#delete-post' 
                                                content='Delete Post'
                                                style={{ backgroundColor: "#F44336", color: "#ffffff", }}
                                                />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                            <tr>
                                <td colSpan="5">No posts found.</td>
                            </tr>
                            )   
                        )}
                        
                    </tbody>
                </table>
                
                {/* Pagination Controls */}
                <TablePagination 
                    currentPage={currentPage}
                    totalPosts={filterPosts.length}
                    postsPerPage={10}
                    onPageChange={handlePageChange}
                />
            </div>
            <ConfirmModal
                isOpen={isModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                message="Are you sure you want to delete this post?"
            />
        </div>
    )
}

export default PostManagement