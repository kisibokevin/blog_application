import React from "react";
import styles from "./adminOverview.module.css"
import { RiEyeLine } from "@remixicon/react";

const AdminOverview = () => {
    return (
        <div className={styles.container}>
            <div className={styles.dashboardCards}>
                <div className={styles.card}>
                    <h3 >Sign-Ups</h3>
                    <p className={styles.signUp}>299</p>
                </div>
                <div className={styles.card}>
                    <h3>Pending Posts</h3>
                    <p className={styles.pendingPosts}>50</p>
                </div>
                <div className={styles.card}>
                    <h3>Flagged Posts</h3>
                    <p className={styles.flaggedPosts}>5</p>
                </div>
                <div className={styles.card}>
                    <h3>Traffic</h3>
                    <p className={styles.webTraffic}>5000 <span className={styles.span}><RiEyeLine /></span></p>
                </div>
                <div className={styles.card}>
                    <h3>User Engagement Overview</h3>
                    {/* Render user engagement stats here */}
                </div>
                <div className={styles.card}>
                    <h3>Site Alerts</h3>
                    {/* Render site alerts here */}
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
