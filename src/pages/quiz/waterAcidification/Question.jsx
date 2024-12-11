import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import NavBar from "../../../components/navbar/NavBar";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Ocean } from "../../../figures/waterAcidificationQuiz/Ocean";
import PostProcessing from "../../acidification/postprocessing/PostProcessing";
import "./Question.css";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import useAuthStore from "/src/stores/use-auth-store.js";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [scoreImproved, setScoreImproved] = useState(false);
  const [score, setScore] = useState(0); // Puntaje del jugador
  const [timeLeft, setTimeLeft] = useState(60); // 60 segundos para encontrar los corales blanqueados
  const [gameOver, setGameOver] = useState(false); // Indicador de fin del juego
  const [gameReset, setGameReset] = useState(0);
  const [selectedBleachedCorals, setSelectedBleachedCorals] = useState([]); // Para verificar corales seleccionados
  const [allBleachedCoralsFound, setAllBleachedCoralsFound] = useState(false); // Verificar si todos los corales fueron seleccionados

  useEffect(() => {
    if (gameOver) return; // Si el juego ha terminado, no iniciar el temporizador.

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setGameOver(true); // Fin del juego
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Limpiar el temporizador cuando el componente se desmonte o el juego termine
  }, [gameReset, gameOver]); // El temporizador depende de gameReset y gameOver

  useEffect(() => {
    if (selectedBleachedCorals.length === 3) {
      // Número de corales dañados (blanqueados)
      setAllBleachedCoralsFound(true);
    }
  }, [selectedBleachedCorals]);

  const handleCoralClick = (coralState, coralId) => {
    if (gameOver) return; // Si el juego terminó, no hacer nada

    // Lógica de puntaje
    if (coralState === "bleached") {
      setScore((prevScore) => prevScore + 45); // Sumar 45 puntos si el coral está dañado
      setSelectedBleachedCorals((prev) => [...prev, coralId]); // Agregar coral seleccionado
    } else if (coralState === "healthy") {
      setScore((prevScore) => Math.max(0, prevScore - 5)); // Restar 5 puntos si el coral está sano
      Swal.fire({
        title: "¡Cuidado!",
        text: `Este coral está sano.`,
        icon: "info",
      });
    }
  };

  const handleRetry = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setGameReset((prev) => prev + 1);
    setSelectedBleachedCorals([]); // Reiniciar los corales seleccionados
    setAllBleachedCoralsFound(false); // Reiniciar la verificación
  };

  useEffect(() => {
    if (!gameOver && !allBleachedCoralsFound) return;

    const updateScoreIfBetter = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const currentScore = userSnap.data().scoreAcidification || 0;

          if (score > currentScore) {
            await updateDoc(userRef, {
              scoreAcidification: score,
              timeAcidification: 60 - timeLeft,
            });
            setScoreImproved(true);
          }
        }
      }
    };

    updateScoreIfBetter();
  }, [gameOver, allBleachedCoralsFound, score, timeLeft, user, navigate]);

  return (
    <>
      <div className="game-background">
        <NavBar />

        <div className="description-container">
          <h1 className="quiz-description">
            ¡Encuentra los corales que están siendo afectados por la
            acidificación!
          </h1>
        </div>

        <div className="quiz-container">
          <div className="quiz-information">
            <h4>Información del juego</h4>
            <h5>
              ¡Ayuda a salvar la flora del océano! Haz clic sobre los corales
              que vayan cambiando de color debido a la acidificación.
            </h5>
            <div className="time-score">
              <div className="time-box">
                <p style={{ color: "#003ABC" }}>Tiempo: {timeLeft}s</p>
              </div>
              <div className="score-box">
                <p style={{ color: "#003ABC" }}>Puntaje: {score}</p>
              </div>
            </div>
          </div>

          <div className="canvas">
            <Canvas
              shadows={true}
              camera={{ position: [2, 1, 20], fov: 90 }}
              style={{
                border: "2px solid rgb(72, 110, 202)",
                borderRadius: "20px",
                boxShadow: "0 4px 8px rgb(72, 110, 202)",
                position: "absolute",
                top: "25%",
                left: "6%",
                width: "1000px",
                height: "700px",
              }}
            >
              <PerspectiveCamera makeDefault position={[3, 5, 12]} fov={32} />
              <OrbitControls enablePan={false} enableZoom={true} />

              <ambientLight intensity={0.5} />
              <PostProcessing />
              <directionalLight
                position={[10, 10, 5]}
                intensity={3}
                castShadow
              />
              <Ocean onCoralClick={handleCoralClick} gameReset={gameReset} />
            </Canvas>
          </div>
        </div>

        {gameOver && !allBleachedCoralsFound && (
          <div className="modal-desing">
            <div className="modal-container">
              <h2>¡Has perdido!</h2>
              <p>El reloj ha terminado.</p>
              <p>Tu puntaje es: {score}</p>
              <button onClick={handleRetry}>Volver a Intentarlo</button>
            </div>
          </div>
        )}

        {allBleachedCoralsFound && !scoreImproved && (
          <div className="modal-desing">
            <div className="modal-container">
              <h2>¡Prueba terminada!</h2>
              <p>
                Has completado la prueba. Sin embargo, no mejoraste tu puntaje.
              </p>
              <button onClick={handleRetry}>Volver a Intentarlo</button>
            </div>
          </div>
        )}

        {allBleachedCoralsFound && scoreImproved && (
          <div className="modal-desing">
            <div className="modal-container">
              <h2>¡Felicitaciones!</h2>
              <p>Has podido salvar la flora de la Isla Malpelo.</p>
              <p>
                ¡Has mejorado tu puntaje! Tu puntaje final es {score}.
              </p>
              <button onClick={handleRetry}>Volver a Intentarlo</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Question;
