'use client';

import React, { useEffect } from 'react';
import styles from './admin.module.css';
import AdminDashboard from '@/components/adminDashboard/Admin';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Admin = () => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated' && session.user.role !== 'admin') {
        router.push('/'); // Redirect to homepage if not an admin
        } else if (status === 'unauthenticated') {
        router.push('/login'); // Redirect to login if not authenticated
        }
    }, [status, session, router]);

    if (status === 'loading') {
        return <p>Loading...</p>; // Show a loading state while session is being checked
    }

    if (!session || session.user.role !== 'admin') {
        return null; // Render nothing if the user is not an admin
    }

    return (
        <div className={styles.container}>
            <AdminDashboard />
        </div>
    );
};

export default Admin;
