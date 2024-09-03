'use client'
import Link from 'next/link';
import React, { useState } from 'react'
import styles from './authlinks.module.css'
import { RiMenuLine, RiCloseLine} from '@remixicon/react'
import { signOut, useSession } from 'next-auth/react'

const AuthLinks = () => {

  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const { data: session, status } = useSession()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to homepage after sign-out
  };

  const isAdmin = session?.user?.role === 'admin'; // Check if user is an admin
  const isCreator = session?.user?.role === 'creator'; // Check if user is a creator
  
  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          {(isAdmin || isCreator) && (
            <Link href="/dashboard" className={styles.link}>
              Dashboard
            </Link>
          )}
          <span className={styles.link} onClick={handleSignOut}>
            Logout
          </span>
        </>
      )}
      <div className={styles.menuIcons} onClick={toggleMenu}>
        {isMenuOpen ? <RiCloseLine /> : <RiMenuLine />}
      </div>
      {isMenuOpen && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {status === "unauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <Link href="/dashboard">Dashboard</Link>
              {(isAdmin || isCreator) && (
                <Link href="/dashboard" className={styles.link}>
                  Dashboard
                </Link>
              )}
              <span className={styles.link} onClick={handleSignOut}>
                Logout
              </span>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default AuthLinks