import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Stingray } from "../../../figures/home/Stingray";

const StingrayComponent = () => {
  const cameraSettings = {
    position: [200, 200, 300],
  };
  return (
    <Canvas camera={cameraSettings}>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={5} />
      <directionalLight position={[3, 2, 1]} />
      <Stingray />
    </Canvas>
  );
};

export default StingrayComponent;
