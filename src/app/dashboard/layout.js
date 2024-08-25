
import AdminLayout from './admin/layout';
import CreatorLayout from "./creator/layout";
import menuItems from '@/data/menuItems'
import DashboardSidebar from '@/components/dashboardSidebar/DashboardSidebar'
import styles from './dashboard.module.css'
import { auth } from "@/auth";

export default async function DashboardLayout({children}) {

    
    //const {data: session} = useSession();
    const session = await auth();
    const userRole = session?.user?.role;

    let DashboardComponent;
    let dashboardMenuItems;

    if (userRole === 'admin') {
        DashboardComponent = AdminLayout;
        dashboardMenuItems = menuItems.admin;
        
    } else if (userRole === 'creator') {
        DashboardComponent = CreatorLayout;
        dashboardMenuItems = menuItems.creator;
    }else {
    // Handle case when the role is not admin or creator
        return null; // Render nothing if the user is not an admin or creator
    }

    return (
        <div className={styles.container}>
            <DashboardSidebar items={dashboardMenuItems}/>
            <div className={styles.main}>
                <DashboardComponent>
                    {children}
                </DashboardComponent>    
            </div>
        </div>
    )
}