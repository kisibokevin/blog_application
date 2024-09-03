'use client';

import React, { useState, useMemo } from 'react';
import styles from './postsmanagement.module.css';
import {
    RiSearchLine,
    RiArrowDownSLine,
    RiArrowLeftSLine,
    RiArrowRightSLine,
    RiEyeLine,
    RiUploadLine,
    RiDownloadLine,
    RiDeleteBinLine
} from "@remixicon/react";
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ConfirmModal from '@/components/confirmModal/ConfirmModal';
import { Tooltip } from 'react-tooltip';
import Notification from '@/components/notification/Notification';
import { revalidatePath } from 'next/cache';

const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message);
        throw error;
    }
    return data;
}

const Dammy = () => {
    const { status } = useSession();
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '', });
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const POSTS_PER_PAGE = 10;

    const { data: posts, error, mutate, isLoading } = useSWR("http://localhost:3000/api/admin", fetcher);

    const handleSearchChange = (e) => setSearchTerm(e.target.value.toLowerCase());
    const handleSortChange = (e) => setSortOrder(e.target.value);
    const handleFilterChange = (e) => setFilterStatus(e.target.value);

    const handlePublish = async (slug) => {
        try {
            const res = await fetch(`http://localhost:3000/api/admin/${slug}`, {
                method: 'PUT',
                body: JSON.stringify({ status: 'published' }),
            });

            if (!res.ok) {
                throw new Error('Failed to Publish Post');
            }

            mutate();
            setNotification({ message: 'Post Published Successfully', type: 'success' });
        } catch (err) {
            console.error('Error Publishing Post', err.message);
            setNotification({ message: 'Error Publishing Post', type: 'error' });
        }
    };

    const handleUnpublish = async (slug) => {
        try {
            const res = await fetch(`http://localhost:3000/api/admin/${slug}`, {
                method: 'PUT',
                body: JSON.stringify({ status: 'pending' }),
            });

            if (!res.ok) {
                throw new Error('Failed to Unpublish Post');
            }

            mutate();
            setNotification({ message: 'Post Unpublished Successfully', type: 'success' });
        } catch (err) {
            console.error('Error UnPublishing Post', err.message);
            setNotification({ message: 'Error Unpublishing Post', type: 'error' });
        }
    };

    const handleAddPost = async () => router.push('/posts/add');

    const viewPost = async (slug) => router.push(`/posts/${slug}`);

    const handleDelete = (slug) => {
        setPostToDelete(slug);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!postToDelete) return;

        try {
            const res = await fetch(`http://localhost:3000/api/admin/${postToDelete}`, {
                method: 'DELETE',
            });

            if (!res.ok) {
                throw new Error('Failed to delete Post');
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
        let filtered = posts;

        // Search functionality
        if (searchTerm) {
            filtered = filtered.filter(
                post => post.title.toLowerCase().includes(searchTerm) ||
                    post.user.name.toLowerCase().includes(searchTerm)
            );
        }

        // Filter functionality
        if (filterStatus) {
            filtered = filtered.filter(post => post.status === filterStatus);
        }

        // Sort functionality
        if (sortOrder) {
            filtered = filtered.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                } else {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }
            });
        }

        return filtered;
    }, [posts, searchTerm, sortOrder, filterStatus]);

    const paginatedPosts = useMemo(() => {
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        return filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);
    }, [filteredPosts, currentPage]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status !== 'authenticated') {
        return <Link href='/login'>Login to Access Dashboard</Link>;
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
                    <button className={styles.addButton} onClick={handleAddPost}>Add New Post</button>
                </div>
                <div className={styles.searchContainer}>
                    <div className={styles.searchBar}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Search by title or author"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <RiSearchLine size={18} color='gray' className={styles.searchIcon} />
                    </div>
                    <div className={styles.sortingBar}>
                        <div className={styles.sort}>
                            <select value={sortOrder} onChange={handleSortChange}>
                                <option value="">Sort by Date</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div className={styles.filter}>
                            <select value={filterStatus} onChange={handleFilterChange}>
                                <option value="">Filter by Status</option>
                                <option value="published">Published</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>
                </div>
                <table className={styles.table}>
                    <thead className={styles.tableHead}>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {paginatedPosts.length > 0 ? (
                            paginatedPosts.map((post) => (
                                <tr key={post.id}>
                                    <td>{post.title}</td>
                                    <td>{post.user.name}</td>
                                    <td className={`${styles[post.status]}`}>{post.status}</td>
                                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                    <td className={styles.action}>
                                        <RiEyeLine id="view-post" size={24} className={styles.viewButton} onClick={() => viewPost(post.slug)} />
                                        {post.status === 'pending' ? (
                                            <RiUploadLine id="publish-post" size={24} className={styles.publishButton} onClick={() => handlePublish(post.slug)} />
                                        ) : (
                                            <RiDownloadLine id="unpublish-post" size={24} className={styles.unpublishButton} onClick={() => handleUnpublish(post.slug)} />
                                        )}
                                        <RiDeleteBinLine id="delete-post" size={24} className={styles.deleteButton} onClick={() => handleDelete(post.slug)} />
                                        <Tooltip anchorSelect="#view-post" content="View Post" place="top" />
                                        <Tooltip anchorSelect="#publish-post" content="Publish Post" place="top" />
                                        <Tooltip anchorSelect="#unpublish-post" content="Unpublish Post" place="top" />
                                        <Tooltip anchorSelect="#delete-post" content="Delete Post" place="top" />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No posts found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className={styles.pagination}>
                    <button onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>
                        <RiArrowLeftSLine />
                    </button>
                    <span>Page {currentPage}</span>
                    <button onClick={() => handlePageChange('next')} disabled={currentPage * POSTS_PER_PAGE >= filteredPosts.length}>
                        <RiArrowRightSLine />
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <ConfirmModal
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    message="Are you sure you want to delete this post?"
                />
            )}
        </div>
    );
};

export default Dammy;
