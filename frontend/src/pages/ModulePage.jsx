import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { modules } from '../data/modules';
import Navbar from '../components/Navbar';
import CodeEditor from '../components/CodeEditor';
import Quiz from '../components/Quiz'; // Import the new Quiz component
import styles from './ModulePage.module.css';
import API_BASE_URL from '../apiConfig';

function ModulePage() {
  const { moduleId } = useParams();
  const [view, setView] = useState('materi'); // 'materi', 'quiz', 'result'
  const [quizResult, setQuizResult] = useState(null);

  const module = modules.find((m) => m.id === moduleId);

  useEffect(() => {
    // When the module changes, reset the view to materi
    setView('materi');
    setQuizResult(null);

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
        // Optionally, show an error to the user
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
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}

export default ModulePage;
