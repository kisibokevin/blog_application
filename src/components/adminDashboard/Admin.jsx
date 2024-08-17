'use client'
import React from 'react'
import styles from './adminComponent.module.css'
import useSWR from "swr";
import { useSession } from "next-auth/react";
import Link from 'next/link';
import { RiDeleteBinLine, RiFileEditLine} from '@remixicon/react';

const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    //console.log(data);

    if (!res.ok) {
        const error = new Error(data.message);
        throw error;
    }

    return data;
};


const AdminDashboard = () => {
    const { status } = useSession();

    const { data: posts, error, mutate, isLoading } = useSWR('http://localhost:3000/api/admin', fetcher);

    const handleDelete = async (id) => {
        await fetch(`http://localhost:3000/api/admin/${id}`, {
            method: 'DELETE',
        });
        mutate();
    };

    const handlePublish = async (id) => {
        await fetch(`http://localhost:3000/api/admin/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                status: 'published',
            }),
        });
        mutate();
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    }


    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status !== 'authenticated') {
        return <Link href="/login" className={styles.link}>Login to Access Admin Panel</Link>;
    }


    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Admin Dashboard</h1>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead className={styles.tableHead}>
                            <tr className={styles.tableRow}>
                                <th className={styles.tableHeading}>Title</th>
                                <th className={styles.tableHeading}>Status</th>
                                <th className={styles.tableHeading}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={styles.tableBody}>
                            {isLoading
                                ? <tr><td colSpan="3">Loading Data.....</td></tr>
                                : Array.isArray(posts) && posts.length > 0
                                ? posts.map((post) => (
                                    <tr key={post._id} className={styles.tableRow}>
                                        <td className={styles.tableData}>{post.title}</td>
                                        <td className={`${styles.tableData} ${styles[post.status]}`}>{post.status}</td>
                                        <td className={`${styles.tableData} ${styles.actions}`}>
                                            <Link className={styles.link} href={`/posts/${post.slug}`}>
                                            View
                                            </Link>
                                            <button className={` ${styles.publishButton}`} onClick={() => handlePublish(post.slug, post.status === 'published' ? 'draft' : 'published')}>
                                            {post.status === 'published' ? 'Unpublish' : 'Publish'}
                                            </button>
                                            <button className={styles.deleteButton} onClick={() => handleDelete(post.slug)}>
                                                <RiDeleteBinLine/>
                                            </button>
                                            
                                        </td>
                                    </tr>
                                )) 
                                : <tr><td colSpan="3">No posts found</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
        </div>
    )
}

export default AdminDashboard