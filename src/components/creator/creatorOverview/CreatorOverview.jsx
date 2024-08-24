import React from 'react'
import styles from './creatorOverview.module.css'
import Image from 'next/image'

const CreatorOverview = () => {
    return (
        <div>
            <div id="key-metrics" className={styles.container}>
                <div className={`${styles.metric} ${styles.totalPosts}`}>
                    Total Posts: 10
                </div>
                <div className={`${styles.metric} ${styles.totalViews}`}>
                    Total Views: 5000
                </div>
                <div className={`${styles.metric} ${styles.totalComments}`}>
                    Total Comments: 200
                </div>
                <div className={`${styles.metric} ${styles.totalLikes}`}>
                    Total Likes: 300
                </div>
            </div>
            <div className={styles.recentPosts}>
                <h2 className={styles.subTitle}>Recent Posts</h2>
                <div className={styles.postsContainer}>
                    <div className={styles.post}>
                        <div className={styles.imageContainer}>
                            <Image src="/laptop.jpg" alt="post" width={350} height={200} className={styles.image}/>
                        </div>
                        <div className={styles.postInfo}>
                            <h3>Title of the Post</h3>
                            <p>Subtitle of the Post</p>
                            <div className={styles.postStats}>
                            100 views, 50 comments, 20 likes
                            </div>
                        </div>
                    </div>

                    <div className={styles.post}>
                        <Image src="/coding.png" alt="post" width={350} height={200} />
                        <div className={styles.postInfo}>
                            <h3>Title of the Post</h3>
                            <p>Subtitle of the Post</p>
                            <div className={styles.postStats}>
                            100 views, 50 comments, 20 likes
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatorOverview