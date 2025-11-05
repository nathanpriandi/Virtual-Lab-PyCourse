import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { modules } from '../data/modules';
import styles from './HomePage.module.css';
import { Link } from 'react-router-dom';
import Typewriter from '../components/Typewriter';
import API_BASE_URL from '../apiConfig';

function HomePage() {
  const [completedModules, setCompletedModules] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
            headers: { 'x-auth-token': token },
          });
          if (response.ok) {
            const userData = await response.json();
            const completedIds = userData.progress
              .filter((p) => p.completed)
              .map((p) => p.moduleId);
            setCompletedModules(completedIds);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, []);

  const topRowModules = modules.slice(0, 5);
  const bottomRowModules = modules.slice(5, 10);

  return (
    <div>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <div className={styles.headerContainer}>
          <h1>Selamat Datang di PyCourse!</h1>

          <Typewriter
            texts={[
              "user = 'PyCourse'",
              "print('Hello PyCourse')",
              'for i in range(5): ',
              'def greet(user): ',
            ]}
            typingSpeed={150}
            deletingSpeed={75}
            pauseDuration={1500}
          />
        </div>

        <p style={{ padding: '0 0 0 1rem' }}>
          Silakan pilih modul di bawah ini untuk memulai perjalanan belajar Python Anda.
        </p>
        <h3 style={{ padding: '0 0 0 1rem' }}>Daftar Modul</h3>
        <div className={styles.moduleList}>
          {topRowModules.map((module, index) => {
            const isCompleted = completedModules.includes(module.id);
            return (
              <Link
                key={module.id}
                to={`/module/${module.id}`}
                className={styles.moduleLink}
              >
                <div
                  className={`${styles.moduleCard} ${isCompleted ? styles.completed : ''} ${module.id === 'variables-syntax' ? styles.centeredImageCard : ''}`}
                >
                  <div className={styles.moduleNumber}>{index + 1}</div>
                  <img src={module.imageUrl} alt={module.title} className={styles.moduleImage} />
                  <div className={styles.cardContent}>
                    <h4>{module.title}</h4>
                    {isCompleted && <span className={styles.completionBadge}>Completed</span>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        <div className={styles.moduleList}>
          {bottomRowModules.map((module, index) => {
            const isCompleted = completedModules.includes(module.id);
            return (
              <Link
                key={module.id}
                to={`/module/${module.id}`}
                className={styles.moduleLink}
              >
                <div
                  className={`${styles.moduleCard} ${isCompleted ? styles.completed : ''} ${module.id === 'variables-syntax' ? styles.centeredImageCard : ''}`}
                >
                  <div className={styles.moduleNumber}>{index + 6}</div>
                  <img src={module.imageUrl} alt={module.title} className={styles.moduleImage} />
                  <div className={styles.cardContent}>
                    <h4>{module.title}</h4>
                    {isCompleted && <span className={styles.completionBadge}>Completed</span>}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default HomePage;