import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom'; 

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logoLink}>
        <h1>PyCourse Virtual Lab</h1>
      </Link>
      
      <div className={styles.navLinks}>
        <Link to="/profile" className={styles.navLink}>Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;