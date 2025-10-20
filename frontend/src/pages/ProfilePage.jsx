import React from "react";
// import Button from "../components/Button";
import { modules, userProgress } from "../data/modules";

function ProfilePage(){
    return (
    <div>
      {/* Navbar bisa ditambahkan di sini agar konsisten dengan halaman lain */}
      <h1>Profil: {userProgress.name}</h1>
      
      {/* Menggunakan <p> untuk teks progres agar lebih semantik */}
      <p>
        <strong>Progres Belajar:</strong> {userProgress.completedModules.length} / {modules.length} modul selesai
      </p>

      {/* Nanti di sini kita bisa menambahkan daftar modul yang sudah selesai */}
    </div>
  );
}

export default ProfilePage;