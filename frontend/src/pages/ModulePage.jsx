import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { modules } from '../data/modules';
import Navbar from '../components/Navbar';
import CodeEditor from '../components/CodeEditor';
import styles from '../components/ModulePage.module.css';

function ModulePage() {
  // 1. Ambil 'moduleId' dari URL
  const { moduleId } = useParams();

  // 2. Cari data modul yang sesuai
  const module = modules.find((m) => m.id === moduleId);

  // 3. Penjagaan jika modul tidak ditemukan
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

  // 4. Jika ditemukan, tampilkan tata letak 70/30
  return (
    <div className={styles.pageContainer}>
      <Navbar />
      <div className={styles.moduleLayout}>
        {/* Kolom 70% untuk Materi */}
        <div className={styles.materiSide}>
          <h2>{module.title}</h2>
          {/* Menampilkan materi HTML dengan aman */}
          <div dangerouslySetInnerHTML={{ __html: module.materi }} />
        </div>

        {/* Kolom 30% untuk Code Editor */}
        <div className={styles.editorSide}>
          <CodeEditor />
        </div>
      </div>
    </div>
  );
}

export default ModulePage;