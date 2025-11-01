import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { modules } from '../data/modules';
import Navbar from '../components/Navbar';
import CodeEditor from '../components/CodeEditor';
import Quiz from '../components/Quiz';
import styles from './ModulePage.module.css';
import API_BASE_URL from '../apiConfig';

function ModulePage() {
  const { moduleId } = useParams();
  const [view, setView] = useState('materi'); // 'materi', 'quiz', 'result'
  const [quizResult, setQuizResult] = useState(null);
  const [initialCode, setInitialCode] = useState(null); // To hold the code for the editor

  const module = modules.find((m) => m.id === moduleId);

  useEffect(() => {
    // Reset views and code when module changes
    setView('materi');
    setQuizResult(null);
    setInitialCode(null);

    const setupModule = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token, use default code and skip API calls
        setInitialCode(module?.defaultCode || "# Silakan login untuk menyimpan kodemu\nprint('Hello, World!')");
        return;
      }

      try {
        // Ensure progress entry exists. This also marks the module as started.
        await fetch(`${API_BASE_URL}/api/progress/complete-module`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
          body: JSON.stringify({ moduleId }),
        });

        // Fetch full user data to get saved code
        const userRes = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { 'x-auth-token': token },
        });

        if (userRes.ok) {
          const userData = await userRes.json();
          const progress = userData.progress.find(p => p.moduleId === moduleId);
          
          // Use saved code, or module default code, or a final fallback
          const savedCode = progress?.userCode;
          const defaultCode = module?.defaultCode || "# Tulis kodemu di sini\nprint('Hello, World!')";
          
          setInitialCode(savedCode ?? defaultCode);
        } else {
          // If fetching user fails, use default code
          setInitialCode(module?.defaultCode || "# Gagal memuat kode tersimpan\nprint('Hello, World!')");
        }
      } catch (error) {
        console.error('Error setting up module:', error);
        setInitialCode(module?.defaultCode || "# Gagal memuat kode tersimpan\nprint('Hello, World!')");
      }
    };

    setupModule();
  }, [moduleId, module]);

  const handleQuizComplete = async (answers) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/progress/submit-quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ moduleId, answers }),
      });

      if (response.ok) {
        const result = await response.json();
        setQuizResult(result);
        setView('result');
      } else {
        console.error('Failed to submit quiz');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

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

  const renderContent = () => {
    switch (view) {
      case 'quiz':
        return <Quiz quizData={module.quiz} onQuizComplete={handleQuizComplete} />;
      case 'result':
        return (
          <div className={styles.resultContainer}>
            <h2>Hasil Kuis</h2>
            <p className={styles.scoreText}>Skor Anda:</p>
            <p className={styles.scoreValue}>{quizResult.score}%</p>
            {quizResult.score === 100 && <p className={styles.congratsMessage}>Kerja bagus! Modul ini telah ditandai selesai.</p>}
            <button onClick={() => setView('materi')} className={styles.primaryButton}>
              Kembali ke Materi
            </button>
          </div>
        );
      case 'materi':
      default:
        return (
          <>
            <div dangerouslySetInnerHTML={{ __html: module.materi }} />
            {module.quiz && (
              <div className={styles.startQuizContainer}>
                <h3>Uji Pemahaman Anda</h3>
                <p>Selesaikan kuis singkat untuk menguji apa yang telah Anda pelajari.</p>
                <button onClick={() => setView('quiz')} className={styles.primaryButton}>
                  Mulai Kuis
                </button>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.moduleLayout}>
        <div className={styles.materiSide}>
          <h2>{module.title}</h2>
          {renderContent()}
        </div>

        <div className={styles.editorSide}>
          {initialCode !== null ? (
            <CodeEditor 
              moduleId={moduleId}
              initialCode={initialCode} 
            />
          ) : (
            <div className={styles.editorLoading}>Loading Editor...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModulePage;
