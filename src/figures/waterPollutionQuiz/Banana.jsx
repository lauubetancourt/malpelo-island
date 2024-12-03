import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Banana(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/waterPollutionQuiz/banana.glb"
  );
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Banana"
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.defaultMat}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollutionQuiz/banana.glb");
