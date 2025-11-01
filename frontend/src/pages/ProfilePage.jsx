import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import API_BASE_URL from '../apiConfig';
import { getAvatarSrc } from '../utils/avatar';
import { modules } from '../data/modules';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isProgressExpanded, setIsProgressExpanded] = useState(false);
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

  const progressStats = useMemo(() => {
    if (!user) return { completedCount: 0, totalModules: 0, percentage: 0, completedIds: new Set() };

    const completedIds = new Set(user.progress.filter(p => p.completed).map(p => p.moduleId));
    const totalModules = modules.length;
    const completedCount = completedIds.size;
    const percentage = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;

    return { completedCount, totalModules, percentage, completedIds };
  }, [user]);

  const handleUploadClick = () => {
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
        setIsEditingAvatar(false);
      } else {
        const errData = await response.json();
        setError(errData.msg || 'Upload failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error('Upload error:', err);
    }
  };

  const handleDeleteAvatar = async () => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/auth/me/avatar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ avatar: null }),
      });

      if (response.ok) {
        setUser(await response.json());
        setIsEditingAvatar(false);
      } else {
        const errData = await response.json();
        setError(errData.msg || 'Failed to remove avatar.');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error('Delete avatar error:', err);
    }
  };

  if (!user) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.profilePage}>
      <Link to="/" className={styles.backButton}>&larr; Kembali ke Home</Link>
      <div className={styles.profileContainer}>
        <div className={styles.avatarWrapper}>
          <img
            src={getAvatarSrc(user)}
            alt="User Avatar"
            className={styles.avatarImage}
          />
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

        <div className={styles.progressSection}>
          <div className={styles.progressHeader}>
            <strong>Pencapaian Modul</strong>
            <span>{progressStats.completedCount} dari {progressStats.totalModules} modul</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressBarFill}
              style={{ width: `${progressStats.percentage}%` }}
            ></div>
          </div>
          <button onClick={() => setIsProgressExpanded(!isProgressExpanded)} className={styles.expandButton}>
            {isProgressExpanded ? 'Sembunyikan Detail' : 'Lihat Detail'}
          </button>
          {isProgressExpanded && (
            <div className={styles.moduleStatusList}>
              {modules.map(module => (
                <div key={module.id} className={styles.moduleStatusItem}>
                  <span>{module.title}</span>
                  <span className={progressStats.completedIds.has(module.id) ? styles.completedCheck : styles.incompleteCheck}></span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={styles.actionsContainer}>
          {!isEditingAvatar ? (
            <button onClick={() => setIsEditingAvatar(true)} className={styles.primaryButton}>
              Ubah Avatar
            </button>
          ) : (
            <div className={styles.editModeActions}>
              <button onClick={handleUploadClick} className={styles.secondaryButton}>
                Upload Baru
              </button>
              {user.avatar && (
                <button onClick={handleDeleteAvatar} className={styles.dangerButton}>
                  Hapus Foto
                </button>
              )}
              <button onClick={() => setIsEditingAvatar(false)} className={styles.tertiaryButton}>
                Batal
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default ProfilePage;