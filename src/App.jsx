// File: src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ModulePage from './pages/ModulePage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ... (useEffect fetchUser Anda tetap sama) ...
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        setUser(null);
      }
      setIsLoading(false);
    }
    fetchUser();
  }, []);


  // --- TAMBAHKAN FUNGSI INI ---
  const handleLogout = async () => {
    try {
      // 1. Panggil API backend untuk menghancurkan cookie
      //    Kita gunakan method 'POST' untuk aksi yang mengubah state
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Gagal menghubungi server logout:', error);
    }
    
    // 2. Apapun yang terjadi di backend, paksa frontend untuk logout
    //    dengan mengatur user ke null.
    setUser(null);
  };
  // ------------------------------


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* ... (Rute AuthPage Anda) ... */}
        <Route 
          path="/" 
          element={!user ? <AuthPage /> : <Navigate to="/home" replace />} 
        />
        
        {/* --- Rute Terlindungi --- */}
        
        {/* Anda juga harus meneruskan onLogout ke HomePage/ModulePage
            untuk Navbar Anda nanti */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute user={user}>
              <HomePage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/module/:moduleId" 
          element={
            <ProtectedRoute user={user}>
              <ModulePage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        
        {/* --- UBAH RUTE INI --- */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute user={user}>
              {/* 1. Teruskan fungsi onLogout sebagai prop */}
              <ProfilePage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        {/* --------------------- */}

        <Route path="*" element={<Navigate to={user ? "/home" : "/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;