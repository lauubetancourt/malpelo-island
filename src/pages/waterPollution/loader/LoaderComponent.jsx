import { Html } from "@react-three/drei";
import React from "react";
import "./LoaderComponent.css";

const LoaderComponent = () => {
  return (
    // Cambiamos "center" por "fullscreen"
    <Html fullscreen>
      <div className="loader-main-container">
        <div className="loader-controls-container">
          <div className="loader-mouse">
            <h2>Navegación</h2>
            <p>Mantén presionado para observar a tu alrededor</p>
            <img src="/images/loader/mouse.webp" alt="Controles de mouse" />
          </div>
        </div>
        <p className="loader-loading">Sumergiéndose en la Ciénaga</p>
      </div>
    </Html>
  );
};

export default LoaderComponent;