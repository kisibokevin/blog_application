'use client'
import React from 'react'
import styles from './contact.module.css'
import { RiArrowRightUpLine } from '@remixicon/react'

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted');
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
            Love to hear from you,<br></br>
            Get in touch 👋
            </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="name">Your Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email">Your Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="example@ex.com"
                            className={styles.input}
                        />                       
                    </div>
                </div>
                <div className={`${styles.inputGroup} ${styles.selectGroup}`}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="interest">Which topic are you interested in?</label>
                        <select name="interest" id="interest" className={styles.select}>
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                            <option value="fullstack">Fullstack</option>
                            <option value="frontend">Tutorials</option>
                            <option value="backend">DevOps</option>
                            <option value="fullstack">Tech News</option>
                        </select>
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="review">Rate Me!</label>
                        <select name="review" id="review" className={styles.select}>
                            <option value="1">⭐</option>
                            <option value="2">⭐⭐</option>
                            <option value="3">⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐</option>
                            <option value="5">⭐⭐⭐⭐⭐</option>
                        </select>
                    </div>
                </div>
                <label htmlFor="message">Your Message</label>
                <textarea id='message' placeholder="Let me know what you think..." className={styles.textarea} />
                <button type='submit' className={styles.button}>Just Send <span><RiArrowRightUpLine /></span></button>
            </form>
        </div>
    )
}

export default Contact