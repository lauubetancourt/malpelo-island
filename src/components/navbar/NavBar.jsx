import React, { useCallback } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
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
            <a href="/inicio">Inicio</a>
          </li>
          <li>
            <a href="/isla-malpelo">Isla Malpelo</a>
          </li>
          <li className="nav-dropdown">
            <a href="#">Problemas ambientales</a>
            <ul className="dropdown-menu">
              <li>
                <a href="/contaminacion-del-agua">Contaminación del agua</a>
              </li>
              <li>
                <a href="/acidificacion-del-oceano">Acidificación de los océanos</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/experiencia-3D">Experiencia 3D</a>
          </li>
          <li>
            <a href="/quiz">Quiz</a>
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
