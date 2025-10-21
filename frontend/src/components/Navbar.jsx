import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom'; 
import logoImage from '../assets/pycourse-logo.png';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logoLink}>
        <img 
          src={logoImage} 
          alt="PyCourse Logo" 
          className={styles.logoImage} 
        />
      </Link>
      
      <div className={styles.navLinks}>
        <Link to="/profile" className={styles.navLink}>Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;