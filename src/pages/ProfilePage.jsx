// File: src/pages/ProfilePage.jsx
import React from 'react';

// 1. Terima 'onLogout' dari props
function ProfilePage({ user, onLogout }) {

  // 2. Buat handler untuk tombol
  const handleLogoutClick = async () => {
    // Panggil fungsi yang kita dapat dari App.jsx
    await onLogout();
  };

  return (
    <div>
      <h1>Profil Pengguna</h1>
      <img src={user.picture} alt="Foto Profil" style={{ borderRadius: '50%' }} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      
      {/* 3. Tambahkan tombol Logout dan hubungkan ke handler */}
      <button onClick={handleLogoutClick} style={{ /* ...styling... */ }}>
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;