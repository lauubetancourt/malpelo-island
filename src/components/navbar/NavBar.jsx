import React from "react";
import "./NavBar.css"; // Asegúrate de importar el archivo CSS

const NavBar = () => {
  return (
    <div className="nav-container">
      <nav className="nav-menu">
        <ul>
          <li>
            <a href="#">Inicio</a>
          </li>
          <li>
            <a href="#">Isla Malpelo</a>
          </li>
          <li>
            <a href="#">Problemas ambientales</a>
          </li>
          <li>
            <a href="#">Experiencia 3D</a>
          </li>
          <li>
            <a href="#">Quiz</a>
          </li>
          <li className="nav-menu-logout">
            <a href="#">Cerrar sesión</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
