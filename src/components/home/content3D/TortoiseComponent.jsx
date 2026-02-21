import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Tortoise } from "../../../figures/wetLand/Tortoise";

const TortoiseComponent = () => {
    const cameraSettings = {
        position: [3, 2, 3],
    };
    return (
        <Canvas camera={cameraSettings}>
            <OrbitControls enableZoom={false} />
            <ambientLight intensity={3} />
            <directionalLight position={[3, 2, 1]} intensity={2} />
            <Tortoise scale={15} position={[0, -0.5, 0]} />
        </Canvas>
    );
};

export default TortoiseComponent;
