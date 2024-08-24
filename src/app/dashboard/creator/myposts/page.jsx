import React from 'react'
import styles from './myPosts.module.css'
import UserPosts from '@/components/creator/userposts/UserPosts'

const MyPosts = () => {
    return (
        <div>
            <h1 className={styles.title}>My Posts</h1>
            {/* Add your posts here */}
            <UserPosts />
        </div>
    );
}

export default MyPosts