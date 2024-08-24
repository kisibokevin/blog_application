'use client'

import useSWR from "swr"
import { useSession } from "next-auth/react"
import Link from "next/link"
import styles from "./userPosts.module.css"

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
    const { data: user, isLoading } = useSession();
    const { data: posts, error , mutate} = useSWR(`/api/userposts?userId=${user?.id}`, fetcher);


    return(
        <div className={styles.container}>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {posts && (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post._id}>
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td>
                                    <Link href={`/edit-post/${post._id}`}>Edit</Link>
                                    <button onClick={() => handleDelete(post._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Link href="/create-post">Create New Post</Link>
        </div>
    )
}

export default UserPosts;