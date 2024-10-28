import { useCallback, useEffect } from "react";
import useAuthStore from "../../stores/use-auth-store";
import { useNavigate } from "react-router-dom";
import User from "../../daos/User";
import "./Login.css";

/**
 * Login component for handling user authentication.
 *
 * This component manages user login through Google authentication, monitors the
 * authentication state, and redirects the user to the Quiz page upon successful login.
 *
 * @component
 */
export default function Login() {
  const { user, loginGoogleWithPopUp, observeAuthState } =
    useAuthStore();

  const navigate = useNavigate();

  /**
   * Handles user login using Google pop-up authentication.
   *
   * @function
   */
  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp();
  }, [loginGoogleWithPopUp]);


  /**
   * Observes the authentication state of the user.
   *
   * @function
   * @useEffect
   */
  useEffect(() => {
    observeAuthState();
  }, [observeAuthState]);

  /**
   * Effect hook that runs when the user state changes. If a user is authenticated,
   * it creates a new user in the database and navigates to the Quiz page.
   *
   * @function
   * @useEffect
   */
  useEffect(() => {
    if (user) {
      const newUser = {
        id: user.uid,
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      };
      User.createUser(newUser);
      navigate("/inicio");
    }
  }, [user, navigate]);

  return (
    <div className="container">
      <div className="login-container">
        <h2>Aquí inicia tu viaje a</h2>
        <h1>Isla Malpelo</h1>
        <p>¿Estás listo para descubrirlo?</p>
        <button onClick={handleLogin}>Iniciar sesión</button>
      </div>
    </div>
  );
}
