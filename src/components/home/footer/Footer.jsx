import React from "react";
import "./Footer.css";

const Footer = ({ bgcolor, color }) => {
  return (
    <footer className="footer" style={{ backgroundColor: bgcolor, color: color }}>
      <div className="footer-container">
        {/* Información del Proyecto */}
        <div className="footer-section">
          <div className="footer-image-container">
            <img
              className="footer-logo"
              src="/images/home/logo.webp"
              alt="logo"
            />
          </div>
          <p className="footer-description">
            Este proyecto busca concientizar sobre los problemas de
            contaminación y acidificación de los océanos <br />
            con un enfoque en la protección de la biodiversidad en la Isla
            Malpelo.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Isla Malpelo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
