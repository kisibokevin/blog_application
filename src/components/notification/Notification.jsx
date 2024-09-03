'use client'
import React, { useEffect } from 'react'
import styles from './notification.module.css'

const Notification = ({ message, type, onClose}) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // Auto dismiss after 3 seconds

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`${styles.notification} ${styles[type]}`}>
            {message}
        </div>
    )
}

export default Notification