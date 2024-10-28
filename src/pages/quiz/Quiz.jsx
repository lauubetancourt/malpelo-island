import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/use-auth-store";
import "./Quiz.css"; 

/**
 * Quiz component for displaying the quiz interface and handling user logout.
 * 
 * This component displays a welcome message and provides a button to log out the user.
 * Upon logging out, the user is redirected to the home page.
 * 
 * @component
 */
export default function Quiz() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  /**
   * Handles user logout and redirects to the home page.
   * 
   * @function
   */
  const handleLogOut = useCallback(() => {
    logout();
    navigate("/");
  }, [logout, navigate]);

  return (
    <div className="container">
      <h1 className="title">Bienvenido a la Isla Malpelo</h1>
      <button 
        className="logout-button" 
        onClick={handleLogOut}
      >
        Cerrar sesión
      </button>
    </div>
  );
}
