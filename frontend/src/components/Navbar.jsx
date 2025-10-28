import React from 'react';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom'; 
import logoImage from '../assets/pycourse-logo.png';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

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
        <button onClick={handleLogout} className={styles.navLink}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
