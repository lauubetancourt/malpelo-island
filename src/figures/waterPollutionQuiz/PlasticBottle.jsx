import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function PlasticBottle(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/waterPollutionQuiz/plasticBottle.glb"
  );
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.107, 0.107]} rotation={[-Math.PI, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            name="PlasticBottle"
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials.Plastic_transparent}
            position={[0.018, 0.001, 0]}
          />
          <mesh
            name="PlasticBottle"
            castShadow
            receiveShadow
            geometry={nodes.Object_6.geometry}
            material={materials.plastic_blue}
            position={[0.021, 0.2, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={[-0.014, 0.001, 0.014]}
          />
          <mesh
            name="PlasticBottle"
            castShadow
            receiveShadow
            geometry={nodes.Object_8.geometry}
            material={materials.plastic_blue}
            position={[0.021, 0.197, 0]}
            rotation={[-Math.PI, 0, 0]}
            scale={[-0.014, 0.001, 0.014]}
          />
          <mesh
            name="Botella"
            castShadow
            receiveShadow
            geometry={nodes.Object_10.geometry}
            material={materials.label}
            position={[0.018, 0.001, 0]}
            scale={[1.011, 0.999, 1.011]}
          />
          <mesh
            name="PlasticBottle"
            castShadow
            receiveShadow
            geometry={nodes.Object_12.geometry}
            material={materials.water}
            position={[0.018, 0.003, 0]}
            scale={[0.929, 0.969, 0.929]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollutionQuiz/plasticBottle.glb");
