'use client'
import React from 'react'
import styles from './dashboardSidebar.module.css'
import menuItems from '@/data/menuItems'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const DashboardSidebar = ({role}) => {

    const { data: session } = useSession();

    const items = role === "creator" ? menuItems.admin : menuItems.creator;


    // check if user role is admin and return admin items else creator items
    //const role = session?.user?.role || "creator";

    //const items = role === 'admin'? menuItems.admin : menuItems.creator;

    return (
        <div className={styles.container}>
            
            {/* Menu items */}
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