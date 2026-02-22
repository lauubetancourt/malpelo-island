import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { WaterLilly } from "../../../figures/wetLand/WaterLilly";

const WaterLillyComponent = () => {
    const cameraSettings = {
        position: [3, 3, 3],
    };
    return (
        <Canvas camera={cameraSettings}>
            <OrbitControls enableZoom={false} />
            <ambientLight intensity={3} />
            <directionalLight position={[3, 2, 1]} intensity={2} />
            <WaterLilly scale={0.4} position={[0, 0, 0]} />
        </Canvas>
    );
};

export default WaterLillyComponent;
