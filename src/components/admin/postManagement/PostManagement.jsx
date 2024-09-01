'use client'

import React, { useState} from 'react'
import styles from './postsmanagement.module.css'
import { RiSearchLine } from '@remixicon/react'
import { RiArrowDownSLine } from '@remixicon/react'
import { RiArrowLeftSLine } from '@remixicon/react'
import { RiArrowRightSLine } from '@remixicon/react'
import useSWR from 'swr'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ConfirmModal from '@/components/confirmModal/ConfirmModal'



const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
        const error = new Error(data.message);
        throw error;
    }
    return data;
}

const PostManagement = () => {

    const { status } = useSession();
    const router = useRouter();

    const [ isModalOpen, setModalOpen ] = useState(false);
    const [postToDelete, setPostToDelete] = useState(null);

    
    /*
    * Fetch data from API, update state when data changes,
    * Render table with posts, pagination, search bar, sorting, filtering,
    * Add new post, view post, delete post, and pagination controls.
    */

    // TODO: Fetch data from API
    const {
        data: posts,
        error,
        mutate,
        isLoading,
    } = useSWR("http://localhost:3000/api/admin", fetcher);

    //console.log(posts);

    // TODO: Update state when data changes
    // TODO: Render table with posts
    // TODO: Render pagination controls
    // TODO: Implement search bar
    // TODO: Implement sorting
    // TODO: Implement filtering
    

    // TODO: Implement publish post functionality
    const handlePublish = async (slug) => {
        // update post status in API and update state
        try {
            await fetch(`http://localhost:3000/api/admin/${slug}`, {
                method: 'PUT',
                body: JSON.stringify({
                    status: 'published',
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to Publish Post')
            }
            mutate();
            
        } catch (err) {
            console.error('Error Publishing Post', err.message);
        }

    };

    // TODO: Implement UnPublish post functionality
    const handleUnpublish = async (slug) => {
        // update post status in API and update state
        try {
            await fetch(`http://localhost:3000/api/admin/${slug}`, {
                method: 'PUT',
                body: JSON.stringify({
                    status: 'pending',
                }),
            });
            if (!res.ok) {
                throw new Error('Failed to Unpublish Post')
            }
            mutate();
            
        } catch (err) {
            console.error('Error UnPublishing Post', err.message);
        }
    };

    // TODO: Implement add new post functionality
    const handleAddPost = async () => {
        // redirect to add post page
        router.push('/posts/add')
    };

    // TODO: Implement view post functionality
    const viewPost = async (slug) => {
        // redirect to post page
        router.push(`/posts/${slug}`)

    };

    // TODO: Implement delete post functionality
    const handleDelete = async (id) => {
        // delete post from API and update state
        if( confirm(
            'Are you sure you want to delete this post?'
        )){await fetch(`http://localhost:3000/api/admin/${id}`, {
            method: 'DELETE',
        });
        mutate();}
    }

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
                <p>Posts Management</p>
                {/* Table */}
                {/* Search Bar */}
                {/* Sorting */}
                {/* Add New Post */}
                {/* Pagination */}
                {/* Edit Post */}
                {/* Delete Post */}
                {/* Filter */}

                <div className={styles.titleDiv}>
                    <h3 className={styles.listTitle}>Posts list</h3>
                    <button className={styles.addButton}>Add New Post</button>
                </div>
                <div className={styles.searchContainer}>
                    <div className={styles.searchBar}>
                        <input className={styles.input} type="text" placeholder="Search by title or author" />
                        <RiSearchLine size={18} color='gray'  className={styles.searchIcon}/>
                    </div>
                    <div className={styles.sortingBar}>
                        <div className={styles.sort}>
                            <select>
                                <option value="">Sort</option>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div className={styles.filter}>
                            <select>
                                <option value="">Filter</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
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
                        {posts && posts.map((post) =>(
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.user.name}</td>
                                <td className={`${styles[post.status]}`}>{post.status}</td>
                                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                <td className={styles.action}>
                                    <button className={styles.viewButton} onClick={() => viewPost(post.slug)}>View</button>
                                    {post.status === 'pending' ? (
                                        <button className={styles.publishButton} onClick={() => handlePublish(post.slug)}>Publish</button>
                                    ) : (
                                        <button className={styles.unpublishButton} onClick={() => handleUnpublish(post.slug)}>Unpublish</button>
                                    )}
                                    <button className={styles.deleteButton} onClick={() => handleDelete(post.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                    <tfoot className={styles.tableFooter}>
                        {/* Pagination Container*/}
                        <div className={styles.pagination}>
                            <RiArrowLeftSLine size={32} color='black' className={`${styles.prevIcon} ${styles.pButton}`}/>
                            <div className={styles.paginationCounter}>
                                <span>1-20 of 100</span>
                            </div>
                            <RiArrowRightSLine size={32} color='black' className={`${styles.nextIcon} ${styles.pButton}`}/>
                        </div>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default PostManagement