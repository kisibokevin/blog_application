

import CreatorOverview from "@/components/creator/creatorOverview/CreatorOverview";
import { auth } from "@/auth";
import AdminOverview from "@/components/admin/adminOverview/AdminOverview";

const MainDashboard = async () => {

    try {
        const session = await auth();

        if (session?.user?.role === "creator") {
            return <CreatorOverview />;
        } else if (session?.user?.role === "admin") {
            return <AdminOverview />;
        } else {
            // Handle cases where the role is not defined or not recognized
            return <div>Unauthorized</div>;
        }
        } catch (error) {
        console.error("Error fetching session:", error);
        // Handle error gracefully, e.g., show an error page or message
        return <div>Error loading dashboard</div>;
    }
}

export const dynamic = "force-dynamic"; 

export default MainDashboard;