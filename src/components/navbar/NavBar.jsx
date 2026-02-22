import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav-container">
      <nav className="nav-menu">
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/cienaga">Ciénaga</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
