import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { modules } from '../data/modules';
import Navbar from '../components/Navbar';
import CodeEditor from '../components/CodeEditor';
import styles from './ModulePage.module.css';
import API_BASE_URL from '../apiConfig';

function ModulePage() {
  const { moduleId } = useParams();

  useEffect(() => {
    const markModuleAsViewed = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await fetch(`${API_BASE_URL}/api/progress/complete-module`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': token,
            },
            body: JSON.stringify({ moduleId }),
          });
        } catch (error) {
          console.error('Error marking module as viewed:', error);
        }
      }
    };

    markModuleAsViewed();
  }, [moduleId]);

  const module = modules.find((m) => m.id === moduleId);
  if (!module) {
    return (
      <div>
        <Navbar />
        <main style={{ padding: '2rem' }}>
          <h2>Modul Tidak Ditemukan</h2>
          <p>Modul yang Anda cari tidak ada.</p>
          <Link to="/">Kembali ke Home</Link>
        </main>
      </div>
    );
  }
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.moduleLayout}>
        <div className={styles.materiSide}>
          <h2>{module.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: module.materi }} />
        </div>

        <div className={styles.editorSide}>
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}

export default ModulePage;