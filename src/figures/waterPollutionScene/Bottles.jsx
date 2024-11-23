import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Bottles(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/waterPollution/plasticBottles.glb"
  );
  return (
    <group {...props} dispose={null} scale={[5, 5, 5]}>
      <RigidBody type="dynamic" colliders="cuboid">
        <mesh
          castShadow
          geometry={nodes.Plastic_Bottle_03_GEO.geometry}
          material={materials.Plastic_Bottles}
          position={[0.59, 0, 0]}
        />
      </RigidBody>
      <RigidBody type="dynamic" colliders="cuboid">
        <mesh
          castShadow
          geometry={nodes.Plastic_Bottle_02_GEO.geometry}
          material={materials.Plastic_Bottles}
        />
      </RigidBody>
      <RigidBody type="dynamic" colliders="cuboid">
        <mesh
          castShadow
          geometry={nodes.Plastic_Bottle_01_GEO.geometry}
          material={materials.Plastic_Bottles}
          position={[-0.367, 0, 0]}
        />
      </RigidBody>
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollution/plasticBottles.glb");
