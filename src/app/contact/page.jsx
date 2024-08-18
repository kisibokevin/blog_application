import React from 'react'
import styles from './contactPage.module.css'
import Contact from '@/components/contact/Contact';

const ContactPage = () => {
    return (
        <div className={styles.container}>
            <Contact />
        </div>
    );
}

export default ContactPage