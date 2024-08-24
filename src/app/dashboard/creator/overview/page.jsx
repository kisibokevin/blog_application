import CreatorOverview from '@/components/creator/creatorOverview/CreatorOverview'
import React from 'react'
import styles from './overview.module.css'

const Overview = () => {
    return (
        <div>
            <h1 className={styles.title}>Overview</h1>
            <CreatorOverview />
        </div>
    )
}

export default Overview