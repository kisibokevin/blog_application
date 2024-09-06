'use client'

import useSWR from "swr"
import { useSession } from "next-auth/react"
import Link from "next/link"
import styles from "./userPosts.module.css"
import { RiEyeLine, RiDeleteBin2Line } from '@remixicon/react'
import { fetcher } from "@/utils/dataUtils"
import { useSortableTable } from "@/utils/sortableTableColumns"
import TableHeader from "@/components/tableHeader/TableHeader"
import { useRouter } from "next/navigation"

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

    const viewPost = async (slug) => {
        // redirect to post page
        router.push(`/posts/${slug}`)

    };

    const { sortedData, sortConfig, handleSort } = useSortableTable(posts || [], 'createdAt', 'asc');

    if (sessionStatus === 'loading') return <div>Loading session...</div>;
    if (!session?.user) return <div>Please sign in to view your posts.</div>;
    
    return (
        <div className={styles.container}>
            {error && <div>Error: {error.message}</div>}
            {!posts && <div>Loading posts...</div>}
            {posts && (
                <table className={styles.table}>
                    <TableHeader columns={columns} sortConfig={sortConfig} onSort={handleSort}/>
                    <tbody className={styles.tableBody}>
                        {sortedData.map((post, index) => (
                            <tr key={post.id}>
                                <td>{index + 1}</td>
                                <td>{post.title}</td>
                                <td className={`${styles[post.status]}`}>{post.status}</td>
                                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                <td className={styles.action}>
                                    <RiEyeLine id="view-post" size={24} className={styles.viewButton} onClick={() => viewPost(post.slug)}/>
                                    <RiDeleteBin2Line id="delete-post" className={styles.deleteButton} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Link href="/dashboard/creator/createpost" className={styles.createPostButton}>Create New Post</Link>
        </div>
    );
};

export default UserPosts;