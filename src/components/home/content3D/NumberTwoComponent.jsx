import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { NumberTwo } from "../../../figures/quiz/NumberTwo";

const NumberTwoComponent = () => {
  const cameraSettings = {
    position: [7, 7, 7], // Cámara más cerca
  };
  return (
    <div style={{ width: "100%", maxWidth: "150px", height: "150px" }}>
      <Canvas camera={cameraSettings}>
        <OrbitControls enableZoom={false} />
        <PerspectiveCamera makeDefault position={[0, 50, 8]} fov={18} />
        <ambientLight intensity={1} />
        <directionalLight position={[3, 2, 1]} />
        <NumberTwo position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} /> {/* Escala ajustada */}
      </Canvas>
    </div>
  );
};

export default NumberTwoComponent;
