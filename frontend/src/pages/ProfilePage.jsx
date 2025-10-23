import React from "react";
import { modules, userProgress } from "../data/modules";

function ProfilePage(){
    return (
    <div>
      <h1>Profil: {userProgress.name}</h1>
      <p>
        <strong>Progres Belajar:</strong> {userProgress.completedModules.length} / {modules.length} modul selesai
      </p>
    </div>
  );
}

export default ProfilePage;