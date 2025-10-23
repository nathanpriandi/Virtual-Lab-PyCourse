import React from 'react';
import Button from '../components/Button';

function AuthPage() {
  return (
    <div>
      <h1>Selamat Datang di PyCourse</h1>
      <p>Silakan login untuk melanjutkan.</p>
      <Button text="Login with Google" />
    </div>
  );
}

export default AuthPage;