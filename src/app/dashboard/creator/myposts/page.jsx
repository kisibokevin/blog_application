import React from 'react'
import styles from './myPosts.module.css'
import UserPosts from '@/components/creator/userposts/UserPosts'

const MyPosts = () => {
    return (
        <div>
            <h2 className={styles.title}>My Posts</h2>
            {/* Add your posts here */}
            <UserPosts />
        </div>
    );
}

export default MyPosts