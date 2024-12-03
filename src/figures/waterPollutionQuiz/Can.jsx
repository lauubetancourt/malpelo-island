import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Can(props) {
  const { nodes, materials } = useGLTF("/models-3d/waterPollutionQuiz/can.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Can"
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.None}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollutionQuiz/can.glb");
