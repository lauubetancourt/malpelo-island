import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Ocean(props) {
  const { nodes, materials } = useGLTF("/models-3d/waterPollution/ocean.glb");
  return (
    <group {...props} dispose={null} onPointerOver={(e) => e.stopPropagation()}>
      <RigidBody type="fixed" colliders="hull">
        <mesh
          castShadow
          geometry={nodes.Coral.geometry}
          material={materials.CoralMaterial}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <mesh geometry={nodes.See.geometry} material={materials.SeeMaterial} />
      </RigidBody>
      <RigidBody type="fixed" colliders="hull">
        <mesh
          castShadow
          geometry={nodes.Rocks_1.geometry}
          material={materials.CoralRockBlackMaterial}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="hull">
        <mesh
          castShadow
          geometry={nodes.Rocks_2.geometry}
          material={materials.CoralRockMaterial}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <mesh geometry={nodes.Sand.geometry} receiveShadow={true}>
          <meshStandardMaterial color={"rgba(234, 213, 173, 0.8)"} />
        </mesh>
      </RigidBody>
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollution/ocean.glb");
