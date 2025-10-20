import React from 'react';
import Navbar from '../components/Navbar';
import { modules } from '../data/modules';
import styles from '../components/HomePage.module.css';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '0rem 2rem' }}>
        <h2>Selamat Datang di PyCourse!</h2>
        <p>Silakan pilih modul di bawah ini untuk memulai perjalanan belajar Python Anda.</p>
        
        <h3>Daftar Modul</h3>
        <div className={styles.moduleList}>
          {modules.map((module) => (
            <Link 
              key={module.id} 
              to={`/module/${module.id}`} 
              className={styles.moduleLink} 
            >
              <div className={styles.moduleCard}>
                <h4>{module.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export default HomePage;