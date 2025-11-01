import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import logoImage from '../assets/pycourse-logo.png';
import { getAvatarSrc } from '../utils/avatar';
import API_BASE_URL from '../apiConfig';

function Navbar() {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: { 'x-auth-token': token },
          });
          if (response.ok) {
            setUser(await response.json());
          }
        } catch (error) {
          console.error('Failed to fetch user for navbar', error);
        }
      };
      fetchUser();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsDropdownOpen(false);
    navigate('/auth');
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logoLink}>
        <img src={logoImage} alt="PyCourse Logo" className={styles.logoImage} />
      </Link>

      <div className={styles.navLinks}>
        {user ? (
          <div className={styles.profileMenu} ref={dropdownRef}>
            <img
              src={getAvatarSrc(user)}
              alt="User Avatar"
              className={styles.navbarAvatar}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownHeader}>
                  <strong>{user.username}</strong>
                  <p>{user.email}</p>
                </div>
                <Link to="/profile" className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
                  Lihat Profil
                </Link>
                <button onClick={handleLogout} className={`${styles.dropdownItem} ${styles.logoutButton}`}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/auth" className={styles.navLink}>Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;