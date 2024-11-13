import { Html } from "@react-three/drei";
import React from "react";
import "./LoaderComponent.css";

const LoaderComponent = () => {
  return (
    <Html center>
      <div className="loader-main-container">
        <div className="loader-controls-container">
          <div className="loader-mouse">
            <h2>Controles de mouse</h2>
            <p>Mantén presionado para navegar</p>
            <img src="/images/loader/mouse.webp" />
          </div>
          <div className="loader-keys">
            <h2>Controles de teclado</h2>
            <p>Descubre las diferentes interacciones con teclado</p>
            <img src="/images/loader/keyboard.webp" />
          </div>
        </div>
        <p className="loader-loading">Cargando</p>
      </div>
    </Html>
  );
};

export default LoaderComponent;
