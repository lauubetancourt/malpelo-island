import React, { useCallback, useState } from "react";
import "./NavBar.css";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "/src/stores/use-auth-store.js";

const NavBar = () => {
  const { user, logout } = useAuthStore();
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
          <li className="nav-dropdown">
            <Link to="#">Isla Malpelo</Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/flora">Flora</Link>
              </li>
              <li>
                <Link to="/fauna">Fauna</Link>
              </li>
              <li>
                <Link to="/datos-curiosos">Datos curiosos</Link>
              </li>
            </ul>
          </li>
          <li className="nav-dropdown">
            <Link to="#">Problemas ambientales</Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/contaminacion-del-agua">Contaminación del agua</Link>
              </li>
              <li>
                <Link to="/acidificacion-del-oceano">
                  Acidificación de los océanos
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-dropdown">
            <Link to="#">Quiz</Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/quiz">Pruebas</Link>
              </li>
              <li>
                <Link to="/ranking">
                  Ranking
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-dropdown profile">
            {user && user.photoURL ? (
              <div className="navbar-profile-container">
                <div className="navbar-profile-summary">
                  <img
                    src={user.photoURL}
                    className="navbar-profile-picture"
                  />
                  <span className="navbar-profile-name">{user.displayName}</span>
                </div>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/perfil">Mi perfil</Link>
                  </li>
                  <li>
                    <Link onClick={handleLogOut}>Cerrar sesión</Link>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                className="nav-menu-sign"
                onClick={() => navigate("/")}
              >
                Iniciar sesión
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
