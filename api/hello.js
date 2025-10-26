// File: backend/api/hello.js

export default function handler(req, res) {

  // BARIS BARU: Cek apakah pesan ini muncul di terminal
  console.log('--- FUNGSI HELLO.JS DIPANGGIL ---');

  // Kirim kembali respons JSON dengan status 200 (OK)
  res.status(200).json({
    message: 'Halo dari backend! Konfigurasi Anda bekerja!',
    timestamp: new Date().toISOString()
  });
}