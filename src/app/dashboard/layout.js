import DashboardSidebar from '@/components/dashboardSidebar/DashboardSidebar'
import styles from './dashboard.module.css'

export default function DashboardLayout({children}) {
    return (
        <div className={styles.container}>
            {/** sidebar */}
            <DashboardSidebar/>
            
            {/** main */}
            <div className={styles.main}>
                {children}
            </div>
        </div>
    )
}