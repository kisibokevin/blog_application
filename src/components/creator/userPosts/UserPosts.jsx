'use client'

import useSWR from "swr"
import { useSession } from "next-auth/react"
import Link from "next/link"
import styles from "./userPosts.module.css"
import { RiEyeLine, RiDeleteBin2Line } from '@remixicon/react'

const fetcher = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    if(!res.ok){
        const error = new Error(data.message);
        throw error;
    }

    return data;
};
// the function below gets user posts and  displays them in a table

const UserPosts = () => {
    const { data: session, status: sessionStatus } = useSession();
    const { data: posts, error, mutate } = useSWR(
        session?.user?.id ? `/api/userposts?userId=${session.user.id}` : null, 
        fetcher
    );

    if (sessionStatus === 'loading') return <div>Loading session...</div>;
    if (!session?.user) return <div>Please sign in to view your posts.</div>;
    
    return (
        <div className={styles.container}>
            {error && <div>Error: {error.message}</div>}
            {!posts && <div>Loading posts...</div>}
            {posts && (
                <table className={styles.postTable}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.status}</td>
                                <td className={styles.actions}>
                                    <Link href={`/edit-post/${post.id}`} className={styles.editButton}><RiEyeLine /></Link>
                                    <button onClick={() => handleDelete(post.id)} className={styles.deleteButton} ><RiDeleteBin2Line /></button>
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