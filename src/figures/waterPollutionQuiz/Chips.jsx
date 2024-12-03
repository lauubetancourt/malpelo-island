import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Chips(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/waterPollutionQuiz/chips.glb"
  );
  return (
    <group {...props} dispose={null}>
      <group rotation={[-1.688, 0.206, -1.803]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            name="Chips"
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.doritos_texture}
            rotation={[0, 0, -Math.PI / 2]}
            scale={[1, 1, 0.654]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollutionQuiz/chips.glb");
