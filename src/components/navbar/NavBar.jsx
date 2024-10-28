import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="nav-container">
      <nav className="nav-menu">
        <ul>
          <li>
            <a href="/inicio">Inicio</a>
          </li>
          <li>
            <a href="#">Isla Malpelo</a>
          </li>
          <li className="nav-dropdown">
            <a href="#">Problemas ambientales</a>
            <ul className="dropdown-menu">
              <li><a href="/contaminacion-del-agua">Contaminación del agua</a></li>
              <li><a href="#">Acidificación de los océanos</a></li>
            </ul>
          </li>
          <li>
            <a href="#">Experiencia 3D</a>
          </li>
          <li>
            <a href="/quiz">Quiz</a>
          </li>
          <li className="nav-menu-logout">
            <a href="/">Cerrar sesión</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
