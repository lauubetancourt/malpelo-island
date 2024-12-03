import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Apple(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/waterPollutionQuiz/apple.glb"
  );
  return (
    <group {...props} dispose={null}>
      <mesh
        name="Apple"
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.AppleMAT}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollutionQuiz/apple.glb");
