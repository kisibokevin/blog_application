import React from 'react'
import styles from './about.module.css'
import Link from 'next/link';

const AboutPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.aboutUs}>
                <Link href="/" className={styles.navlink}>Home <span> {'> About Us'}</span></Link>
                <h1 className={styles.title}>About Us</h1>
                <p>Welcome to Code Chronicles, your go-to destination for all things web development and technology. Whether you&apos;re a seasoned developer, an enthusiastic beginner, or just curious about the ever-evolving tech landscape, Code Chronicles is here to guide you on your journey.
                </p>
            </div>
            <div className={styles.mission}>
                <h1 className={styles.title}>Our Mission</h1>
                <p>At Code Chronicles, our mission is to empower developers of all levels with the knowledge and tools they need to succeed in the fast-paced world of web development. We believe in creating high-quality, accessible content that not only educates but also inspires. Our aim is to bridge the gap between complex coding concepts and practical, real-world applications.
                </p>
            </div>
            <div className={styles.offer}>
                <h1 className={styles.title}>What We Offer</h1>
                <ul className={styles.list}>
                    <li className={styles.listItem}>
                        In-Depth Tutorials: Step-by-step guides that break down intricate coding challenges, making it easier for you to build, create, and innovate.
                    </li>
                    <li className={styles.listItem}>
                        Latest Tech Trends: Stay ahead of the curve with insights into the newest trends, tools, and technologies in the web development sphere.
                    </li>
                    <li className={styles.listItem}>
                        Expert Insights: Learn from experienced developers and industry experts who share their tips, tricks, and best practices.
                    </li>
                    <li className={styles.listItem}>
                        Project Showcases: Explore featured projects that demonstrate the power of modern web technologies in action.
                    </li>
                    <li className={styles.listItem}>
                        Community Engagement: Connect with a vibrant community of like-minded individuals who share a passion for web development and technology.
                    </li>
                </ul>
            </div>
            <div className={styles.ourStory}>
                <h1 className={styles.title}>Our Story</h1>
                <p>
                    Code Chronicles was born out of a passion for coding and a desire to share knowledge with the wider tech community. What started as a small personal project has grown into a platform dedicated to helping developers navigate the complexities of web development.
                </p>
                <p>
                    We understand the challenges and excitement of learning new technologies, and we’re here to support you every step of the way. Our content is crafted with care, ensuring that you receive accurate, up-to-date information that can be directly applied to your projects.
                </p>
            </div>
            <div className={styles.joinUs}>
                <h1 className={styles.title}>Join Us</h1>
                <p>We invite you to explore, learn, and grow with Code Chronicles. Whether you’re looking to solve a specific coding problem, stay updated on industry trends, or just need some inspiration, you’ll find it here. Thank you for being a part of our community!
                </p>
                <button className={styles.button}>Join Us</button>
            </div>
            <div className={styles.outro}>
                <h1>Happy Coding!</h1>
                <p>The Code Chronicles Team</p>
            </div>
        </div>
    );
}

export default AboutPage