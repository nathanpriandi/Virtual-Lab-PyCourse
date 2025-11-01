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
    if (!selectedAvatar || !user || selectedAvatar === user.avatar) {
      return;
    }

    try {
      setApiError('');
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/auth/me/avatar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ avatar: selectedAvatar }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsModalOpen(false);
      } else {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.msg || 'Gagal memperbarui avatar. Server error.';
        setApiError(errorMsg);
        console.error('Failed to update avatar:', errorData);
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
            {apiError && <p className={styles.modalError}>{apiError}</p>}
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
