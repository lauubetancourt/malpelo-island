import { useCallback, useEffect } from "react";
import useAuthStore from "../../stores/use-auth-store";
import UserDao from "../../daos/UserDao";
import { useNavigate } from "react-router-dom";

/**
 * Login component for handling user authentication.
 * 
 * This component manages user login through Google authentication, monitors the 
 * authentication state, and redirects the user to the Quiz page upon successful login.
 * 
 * @component
 */
export default function Login() {
  const { user, loginGoogleWithPopUp, observeAuthState, logout } =
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
   * Handles user logout.
   * 
   * @function
   */
  const handleLogOut = useCallback(() => {
    logout();
  }, [logout]);

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
      UserDao.createUser(newUser);
      navigate("/Quiz");
    }
  }, [user, navigate]);

  return (
    <div className="container-login">
      <p className="welcome-text">Inicie sesión para continuar</p>
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
}