import React from 'react';
import styles from './AuthPage.module.css';

function AuthPage() {
  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <h1>Selamat Datang!</h1>
        <p>Login untuk memulai perjalanan Python Anda di PyCourse.</p>
        
        <a href="/api/auth/login" className={styles.googleLoginButton}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" 
            alt="Google logo" 
            className={styles.googleIcon} 
          />
          Login dengan Google
        </a>
      </div>
    </div>
  );
}

export default AuthPage;