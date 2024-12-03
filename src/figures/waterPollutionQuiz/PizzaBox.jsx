import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function PizzaBox(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/waterPollutionQuiz/pizzaBox.glb"
  );
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          name="PizzaBox"
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.lambert11SG}
        />
        <mesh
          name="PizzaBox"
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.lambert12SG}
        />
        <mesh
          name="PizzaBox"
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.lambert15SG}
        />
        <mesh
          name="PizzaBox"
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.lambert10SG}
        />
        <mesh
          name="PizzaBox"
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials.lambert13SG}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollutionQuiz/pizzaBox.glb");
