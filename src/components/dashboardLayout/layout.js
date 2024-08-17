import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";


const DashboardLayout = ({ children }) => {
    return (
		<div>
			<Navbar />
			<div className="dashboard-container">
			<Sidebar />
			<main>{children}</main>
			</div>
		</div>
    );
};

export default DashboardLayout;