import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { NumberOne } from "../../../figures/quiz/NumberOne";

const NumberOneComponent = () => {
  const cameraSettings = {
    position: [7, 7, 7], // Posición más cercana para centrado
  };
  return (
    <div style={{ width: "100%", maxWidth: "150px", height: "150px" }}>
      <Canvas camera={cameraSettings}>
        <OrbitControls enableZoom={false} />
        <PerspectiveCamera makeDefault position={[0, 50, 8]} fov={18} />
        <ambientLight intensity={1} />
        <directionalLight position={[3, 2, 1]} />
        <NumberOne position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} /> {/* Escala ajustada */}
      </Canvas>
    </div>
  );
};

export default NumberOneComponent;
