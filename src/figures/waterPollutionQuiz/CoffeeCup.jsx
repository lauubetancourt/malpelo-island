import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function CoffeeCup(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/waterPollutionQuiz/coffeeCup.glb"
  );
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.233}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[0, 2.439, 0]} scale={[1.573, 2.439, 1.573]}>
            <mesh
              name="CoffeeCup"
              castShadow
              receiveShadow
              geometry={nodes.Object_5.geometry}
              material={materials.material}
              position={[-0.001, -0.083, 0]}
              scale={[0.636, 0.41, 0.636]}
            />
            <mesh
              name="CoffeeCup"
              castShadow
              receiveShadow
              geometry={nodes.Object_7.geometry}
              material={materials.material_1}
              position={[0, 0.724, -0.001]}
              rotation={[0, -Math.PI / 2, 0]}
              scale={[1.036, 0.628, 1.036]}
            />
            <mesh
              name="CoffeeCup"
              castShadow
              receiveShadow
              geometry={nodes.Object_9.geometry}
              material={materials.Sleeve}
              position={[-0.001, -1, 0]}
              scale={[0.636, 0.41, 0.636]}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollutionQuiz/coffeeCup.glb");
