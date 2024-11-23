import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Tire(props) {
  const { nodes, materials } = useGLTF("/models-3d/waterPollution/tire.glb");
  return (
    <RigidBody type="fixed" position={[10, 2, -12]} colliders="cuboid">
      <group {...props} dispose={null}>
        <group rotation={[-Math.PI, 0, 0]}>
          <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.defaultMaterial.geometry}
              material={materials.Material}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={10}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.defaultMaterial_1.geometry}
              material={materials.Material}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={10}
            />
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/models-3d/waterPollution/tire.glb");
