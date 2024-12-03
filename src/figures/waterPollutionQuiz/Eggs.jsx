import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Eggs(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/waterPollutionQuiz/eggs.glb"
  );
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Eggs"
        castShadow
        receiveShadow
        geometry={nodes.Mesh_Default_0.geometry}
        material={materials.Default}
      />
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollutionQuiz/eggs.glb");
