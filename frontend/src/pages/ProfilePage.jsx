import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import API_BASE_URL from '../apiConfig';

// --- Avatar Generation Logic ---
const generateAvatarDataUri = (name) => {
  const getInitials = (name) => {
    const words = name.split(' ');
    if (words.length > 1) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const getBackgroundColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = hash % 360;
    return `hsl(${h}, 65%, 50%)`;
  };

  const initials = getInitials(name || '??');
  const backgroundColor = getBackgroundColor(name || 'Default');

  const svgString = `
    <svg width="150" height="150" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}" />
      <text x="50%" y="50%" font-family="'Arial', sans-serif" font-size="60" fill="#ffffff" text-anchor="middle" dy=".3em">
        ${initials}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};

const getAvatarSrc = (user) => {
  if (user && user.avatar) {
    return `${API_BASE_URL}/uploads/${user.avatar}`;
  }
  return generateAvatarDataUri(user ? user.username : '');
};
// --------------------------------

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/auth');
          return;
        }

        const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { 'x-auth-token': token },
        });

        if (response.ok) {
          setUser(await response.json());
        } else {
          localStorage.removeItem('token');
          navigate('/auth');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
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

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError('');
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/auth/me/avatar/upload`, {
        method: 'POST',
        headers: {
          'x-auth-token': token,
        },
        body: formData,
      });

      if (response.ok) {
        setUser(await response.json());
      } else {
        const errData = await response.json();
        setError(errData.msg || 'Upload failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error('Upload error:', err);
    }
  };

  if (!user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileContainer}>
        <div className={styles.avatarWrapper}>
          <img
            src={getAvatarSrc(user)}
            alt="User Avatar"
            className={styles.avatarImage}
          />
          <button onClick={handleEditClick} className={styles.editAvatarButton}>
            Ganti
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            accept="image/png, image/jpeg, image/gif"
          />
        </div>

        {error && <p className={styles.errorText}>{error}</p>}

        <h1>{user.username}</h1>
        <p>{user.email}</p>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;