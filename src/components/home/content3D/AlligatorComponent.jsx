import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Alligator } from "../../../figures/wetLand/Alligator";

const AlligatorComponent = () => {
    const cameraSettings = {
        position: [2, 2, 3],
    };
    return (
        <Canvas camera={cameraSettings}>
            <OrbitControls enableZoom={false} />
            <ambientLight intensity={3} />
            <directionalLight position={[3, 2, 1]} intensity={2} />
            <Alligator scale={3} position={[0, -0.5, 0]} />
        </Canvas>
    );
};

export default AlligatorComponent;
