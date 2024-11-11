import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import SaveText from "../../../figures/home/SaveText";

const SaveTextComponent = () => {
  const cameraSettings = {
    position: [250, 250, 250],
  };
  return (
    <Canvas camera={cameraSettings}>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={5} />
      <directionalLight position={[3, 2, 1]} />
      <SaveText />
    </Canvas>
  );
};

export default SaveTextComponent;
