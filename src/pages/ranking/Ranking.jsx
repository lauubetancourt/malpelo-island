import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.config";
import NavBar from "../../components/navbar/NavBar";
import "./Ranking.css";

const Ranking = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTop5Players = async () => {
    try {
      const usersRef = collection(db, "users");
      const userDocs = await getDocs(usersRef);

      const players = [];

      userDocs.forEach((doc) => {
        const data = doc.data();
        const scoreAcidification = data.scoreAcidification || 0;
        const timeAcidification = data.timeAcidification || 0;
        const scorePollution = data.scorePollution || 0;
        const timePollution = data.timePollution || 0;

        // Calcula el puntaje total
        const totalScore =
          scoreAcidification +
          scorePollution -
          (timeAcidification + timePollution) * 0.5;

        players.push({
          uid: doc.id,
          name: data.name || "Anónimo",
          totalScore,
          scoreAcidification,
          timeAcidification,
          scorePollution,
          timePollution,
        });
      });

      // Ordenar por puntaje total descendente
      players.sort((a, b) => b.totalScore - a.totalScore);

      // Tomar los 5 mejores
      return players.slice(0, 5);
    } catch (error) {
        return [];
    }
  };

  useEffect(() => {
    const getPlayers = async () => {
      const topPlayers = await fetchTop5Players();
      setPlayers(topPlayers);
      setLoading(false);
    };
    getPlayers();
  }, []);

  const getMedal = (position) => {
    switch (position) {
      case 1:
        return "🥇"; // Medalla de oro
      case 2:
        return "🥈"; // Medalla de plata
      case 3:
        return "🥉"; // Medalla de bronce
      default:
        return null;
    }
  };

  return (
    <>
      <NavBar />
      <div className="quiz-container">
        <p className="quiz-container-title">Ranking</p>
        <h2 className="quiz-subtitle-text">
          Conoce a nuestros guardianes de la Isla Malpelo
        </h2>
        <p className="ranking-text">
          ¿Quieres formar parte de ellos? ¡Participa de nuestros quizzes!
        </p>
      </div>
      <div className="ranking-container">
        {loading ? (
          <p>Cargando...</p>
        ) : players.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Posición</th>
                <th>Nombre</th>
                <th>Puntaje Total</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={player.uid}>
                  <td>
                    {getMedal(index + 1) ? (
                      <span className="medal">{getMedal(index + 1)}</span>
                    ) : (
                      index + 1
                    )}
                  </td>
                  <td>{player.name}</td>
                  <td>{player.totalScore.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay jugadores en el ranking.</p>
        )}
      </div>
    </>
  );
};

export default Ranking;
