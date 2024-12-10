import { useCallback, useEffect } from "react";
import useAuthStore from "../../stores/use-auth-store";
import { useNavigate } from "react-router-dom";
import User from "../../daos/User";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";

export default function Login() {
  const { user, loginGoogleWithPopUp, observeAuthState } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp();
  }, [loginGoogleWithPopUp]);

  useEffect(() => {
    observeAuthState();
  }, [observeAuthState]);

  useEffect(() => {
    if (user) {
      const userRef = User.getUserById(user.uid);

      // Si el usuario ya existe en la base de datos, no lo creamos de nuevo
      userRef.then((userData) => {
        if (!userData.success) {
          const newUser = {
            id: user.uid,
            email: user.email,
            name: user.displayName,
            photo: user.photoURL,
            bestScore: 0,
            scorePollution: 0,
            scoreAcidification: 0,
            timePollution: 0,
            timeAcidification: 0,
            ranking: 0,
          };

          // Crea el usuario si no existe
          User.createUser(newUser).then(() => {
            navigate("/inicio");
          });
        } else {
            navigate("/inicio");
        }
      });
    }
  }, [user, navigate]);

  return (
    <div className="container">
      <div className="login-container">
        <h2>Aquí inicia tu viaje a</h2>
        <h1>Isla Malpelo</h1>
        <p>¿Estás listo para descubrirlo?</p>
        <p className="login-text">Inicia sesión para continuar</p>
        <button onClick={handleLogin}>
          <FcGoogle className="google-icon" />
        </button>
      </div>
    </div>
  );
}
