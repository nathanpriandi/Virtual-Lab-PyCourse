import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import API_BASE_URL from '../apiConfig';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/auth');
          return;
        }

        const url = `${API_BASE_URL}/api/auth/me`;
        const response = await fetch(url, {
          headers: {
            'x-auth-token': token,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          // Handle error, e.g., token expired
          localStorage.removeItem('token');
          navigate('/auth');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');
        navigate('/auth');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        <h1>Profil Pengguna</h1>
        {/* Assuming the user object has username and email properties */}
        <h2>{user.username}</h2>
        <p>{user.email}</p>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
