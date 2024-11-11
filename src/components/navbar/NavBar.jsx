import React, { useCallback } from "react";
import "./NavBar.css";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "/src/stores/use-auth-store.js";

const NavBar = () => {
  const { logout } = useAuthStore();

  const navigate = useNavigate();

  const handleLogOut = useCallback(async () => {
    await logout();
    navigate("/");
  }, [logout]);

  return (
    <div className="nav-container">
      <nav className="nav-menu">
        <ul>
          <li>
            <Link to="/inicio">Inicio</Link>
          </li>
          <li>
            <Link to="/isla-malpelo">Isla Malpelo</Link>
          </li>
          <li className="nav-dropdown">
            <Link to="#">Problemas ambientales</Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/contaminacion-del-agua">Contaminación del agua</Link>
              </li>
              <li>
                <Link to="/acidificacion-del-oceano">Acidificación de los océanos</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/quiz">Quiz</Link>
          </li>
          <li className="nav-menu-logout">
            <button onClick={handleLogOut}>Cerrar sesión</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
