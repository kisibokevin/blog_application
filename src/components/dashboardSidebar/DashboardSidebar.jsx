'use client'
import React from 'react'
import styles from './dashboardSidebar.module.css'
import Link from 'next/link'

const DashboardSidebar = ({ items }) => {
    //console.log("DashboardSidebar items:", items);

    if (!items || !Array.isArray(items)) {
        console.error("DashboardSidebar received an invalid items prop:", items);
        return null; // or return a fallback UI
    }

    return (
        <div className={styles.container}>
            <div className={styles.menuItems}>
                {items.map((item, index) => (
                    <div key={index} className={styles.item}>
                        <Link href={item.href} className={styles.item_link}>
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DashboardSidebar