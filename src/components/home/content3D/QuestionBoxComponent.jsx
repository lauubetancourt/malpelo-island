import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { QuestionBox } from "../../../figures/home/QuestionBox";

const QuestionBoxComponent = () => {
  const cameraSettings = {
    position: [250, 250, 250],
  };
  return (
    <Canvas camera={cameraSettings}>
      <OrbitControls enableZoom={false} />
      <directionalLight position={[5, 3, 5]} />
      <directionalLight position={[-5, 2, -5]} />
      <QuestionBox rotation={[0, 30, 0]} scale={1.5} position={[0, -100, 0]} />
    </Canvas>
  );
};

export default QuestionBoxComponent;
