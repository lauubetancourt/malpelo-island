import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase.config";
import useAuthStore from "/src/stores/use-auth-store.js";
import NavBar from "../../components/navbar/NavBar";
import "./Profile.css"; // Importa el archivo CSS

const Profile = () => {
  const { user } = useAuthStore();
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchUserScore = async () => {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setAllData(userData);
        }
      };
      fetchUserScore();
    }
  }, [user]);


  return (
    <>
      <NavBar />
      <div className="profile-container">
        <div className="profile-content">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="profile-image"
          />
          <div className="profile-info">
            <h2 className="user-name">{user.displayName}</h2>
            <p className="user-email">{user.email}</p>
            <div className="scores-container">
              <h2 className="section-title">Mis puntajes y tiempos</h2>
              <div className="score-card">
                <h3 className="quiz-title">Contaminación del agua</h3>
                <p className="score-text">
                  {allData?.scorePollution} puntos, {allData?.timePollution}{" "}
                  segundos
                </p>
              </div>
              <div className="score-card">
                <h3 className="quiz-title">Acidificación de los océanos</h3>
                <p className="score-text">
                  {allData?.scoreAcidification} puntos,{" "}
                  {allData?.timeAcidification} segundos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
