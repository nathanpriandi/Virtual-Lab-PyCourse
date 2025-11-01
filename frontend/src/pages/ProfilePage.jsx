import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import API_BASE_URL from '../apiConfig';
import { getAvatarUrl, avatarIdentifiers } from '../data/avatars';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [apiError, setApiError] = useState('');
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

  const openAvatarModal = () => {
    if (user) {
      setSelectedAvatar(user.avatar);
      setApiError('');
    }
    setIsModalOpen(true);
  };

  const handleAvatarUpdate = async () => {
    console.log('Button clicked!');
    console.log('Selected avatar:', selectedAvatar);
    console.log('Current user avatar:', user?.avatar);
    
    if (!selectedAvatar || !user || selectedAvatar === user.avatar) {
      console.log('Condition failed - not updating');
      return;
    }

    try {
      setApiError('');
      const token = localStorage.getItem('token');
      
      // Try PATCH method first (most RESTful for partial updates)
      console.log('Attempting PATCH to /api/auth/me');
      let response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ avatar: selectedAvatar }),
      });

      // If PATCH doesn't work, try PUT
      if (response.status === 404 || response.status === 405) {
        console.log('PATCH failed, trying PUT to /api/auth/me');
        response = await fetch(`${API_BASE_URL}/api/auth/me`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
          body: JSON.stringify({ avatar: selectedAvatar }),
        });
      }

      console.log('Response status:', response.status);

      if (response.ok) {
        const updatedUser = await response.json();
        console.log('Avatar updated successfully:', updatedUser);
        setUser(updatedUser);
        setIsModalOpen(false);
      } else {
        const contentType = response.headers.get('content-type');
        let errorMsg = 'Gagal memperbarui avatar. Server error.';
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const errorData = await response.json().catch(() => ({}));
          errorMsg = errorData.msg || errorData.message || errorMsg;
        } else {
          const errorText = await response.text();
          console.error('Error response:', errorText);
        }
        setApiError(errorMsg);
        console.error('Failed to update avatar:', errorMsg);
      }
    } catch (error) {
      setApiError('Gagal koneksi ke server. Periksa koneksi Anda.');
      console.error('Error updating avatar:', error);
    }
  };

  if (!user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <div className={styles.profilePage}>
        <div className={styles.profileContainer}>
          <div className={styles.avatarWrapper}>
            <img
              src={getAvatarUrl(user.avatar)}
              alt="User Avatar"
              className={styles.avatarImage}
            />
            <button
              onClick={openAvatarModal}
              className={styles.editAvatarButton}
            >
              Ganti
            </button>
          </div>

          <h1>{user.username}</h1>
          <p>{user.email}</p>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Pilih Avatar Baru</h2>
            {apiError && (
              <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1.5rem', fontWeight: '600' }}>
                {apiError}
              </p>
            )}
            <div className={styles.avatarList}>
              {avatarIdentifiers.map((avatarId) => (
                <div
                  key={avatarId}
                  className={`${styles.avatarOption} ${
                    selectedAvatar === avatarId ? styles.selected : ''
                  }`}
                  onClick={() => setSelectedAvatar(avatarId)}
                >
                  <img src={getAvatarUrl(avatarId)} alt={`Avatar ${avatarId}`} />
                </div>
              ))}
            </div>
            <div className={styles.modalActions}>
              <button
                onClick={() => setIsModalOpen(false)}
                className={styles.closeModalButton}
              >
                Batal
              </button>
              <button
                onClick={handleAvatarUpdate}
                className={styles.saveModalButton}
                disabled={!selectedAvatar || selectedAvatar === user.avatar}
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfilePage;