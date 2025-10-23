import React, { useState, useEffect } from 'react';
import styles from './Typewriter.module.css';

function Typewriter({ texts, typingSpeed = 150, deletingSpeed = 75, pauseDuration = 2000 }) {
  
  // 2. State untuk melacak teks mana di array yang sedang aktif
  const [textIndex, setTextIndex] = useState(0); 
  
  // 3. State untuk teks yang tampil di layar
  const [displayedText, setDisplayedText] = useState('');
  
  // 4. State untuk melacak mode: 'isDeleting' (true) atau 'isTyping' (false)
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Ambil teks target saat ini dari array
    const currentText = texts[textIndex];
    let timeoutId;

    if (isDeleting) {
      // --- LOGIKA SAAT MENGHAPUS ---
      if (displayedText.length > 0) {
        // Jika masih ada teks, hapus satu karakter
        timeoutId = setTimeout(() => {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        }, deletingSpeed);
      } else {
        // Jika sudah kosong, pindah ke teks berikutnya dan ganti mode
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % texts.length); // Ini yang membuatnya infinite
      }
    } else {
      // --- LOGIKA SAAT MENGETIK ---
      if (displayedText.length < currentText.length) {
        // Jika teks belum lengkap, tambah satu karakter
        timeoutId = setTimeout(() => {
          setDisplayedText(currentText.substring(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // Jika teks sudah lengkap, PAUSE, lalu ganti mode ke menghapus
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    }

    // Fungsi cleanup: membatalkan timer jika komponen di-unmount
    return () => clearTimeout(timeoutId);

    // 5. Dependency array: 'useEffect' ini akan berjalan lagi jika salah satu state ini berubah
  }, [displayedText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseDuration]);

  // 'span' ini adalah elemen yang akan kita lihat di layar
  return (
    <span className={styles.typewriterText}>
      {displayedText}
    </span>
  );
}

export default Typewriter;