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
  const [view, setView] = useState('materi');
  const [quizResult, setQuizResult] = useState(null);
  const [initialCode, setInitialCode] = useState(null);

  const module = modules.find((m) => m.id === moduleId);

  useEffect(() => {
    setView('materi');
    setQuizResult(null);
    setInitialCode(null);

    const setupModule = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setInitialCode(module?.defaultCode || "# Silakan login untuk menyimpan kodemu\nprint('Hello, World!')");
        return;
      }

      try {
        await fetch(`${API_BASE_URL}/api/progress/complete-module`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
          body: JSON.stringify({ moduleId }),
        });

        const userRes = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { 'x-auth-token': token },
        });

        if (userRes.ok) {
          const userData = await userRes.json();
          const progress = userData.progress.find(p => p.moduleId === moduleId);
          
          const savedCode = progress?.userCode;
          const defaultCode = module?.defaultCode || "# Tulis kodemu di sini\nprint('Hello, World!')";
          
          setInitialCode(savedCode ?? defaultCode);
        } else {
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
        <main style={{ padding: '2rem' }} className={styles.notFoundContainer}>
          <h2>Modul Tidak Ditemukan</h2>
          <p>Modul yang Anda cari tidak ada.</p>
          <Link to="/">Kembali ke Modul</Link>
        </main>
      </div>
    );
  }

  const renderContent = () => {
    switch (view) {
      case 'quiz':
        return <Quiz quizData={module.quiz} onQuizComplete={handleQuizComplete} />;
      case 'result':
        if (!quizResult || !quizResult.detailedResults) {
          return <div className={styles.resultContainer}>Loading results...</div>;
        }

        const correctAnswers = quizResult.detailedResults.filter(r => r.correct).length;
        const totalQuestions = quizResult.detailedResults.length;
        const incorrectAnswers = totalQuestions - correctAnswers;

        return (
          <div className={styles.resultContainer}>
            <h2>Hasil Kuis</h2>
            <p className={styles.scoreText}>Skor Anda:</p>
            <p className={styles.scoreValue}>{quizResult.score}%</p>

            <div className={styles.quizSummary}>
              <div className={styles.summaryItem}>
                <span>Benar</span>
                <span className={`${styles.summaryValue} ${styles.correct}`}>{correctAnswers}</span>
              </div>
              <div className={styles.summaryItem}>
                <span>Salah</span>
                <span className={`${styles.summaryValue} ${styles.incorrect}`}>{incorrectAnswers}</span>
              </div>
              <div className={styles.summaryItem}>
                <span>Total</span>
                <span className={styles.summaryValue}>{totalQuestions}</span>
              </div>
            </div>

            {incorrectAnswers > 0 && (
              <div className={styles.incorrectList}>
                <h3>Perlu Diperbaiki:</h3>
                <ul>
                  {quizResult.detailedResults.map((result, index) => (
                    !result.correct && <li key={index}>Pertanyaan #{index + 1}</li>
                  ))}
                </ul>
              </div>
            )}

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
      {view !== 'quiz' && view !== 'result' && (
        <div className={styles.homeButtonContainer}>
          <Link to="/" className={styles.homeButton}>Kembali ke Home</Link>
        </div>
      )}
      <div className={`${styles.moduleLayout} ${view === 'quiz' || view === 'result' ? styles.quizView : ''}`}>
        <div className={styles.materiSide}>
          {view !== 'materi' && (
            <button onClick={() => setView('materi')} className={styles.backButton}>
              Kembali ke Modul
            </button>
          )}
          {view !== 'quiz' && <h2>{module.title}</h2>}
          {renderContent()}
        </div>

        {view !== 'quiz' && (
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
        )}
      </div>
    </div>
  );
}

export default ModulePage;
