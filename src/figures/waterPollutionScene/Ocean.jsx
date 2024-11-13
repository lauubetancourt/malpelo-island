import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Ocean(props) {
  const { nodes, materials } = useGLTF("/models-3d/waterPollution/ocean.glb");
  return (
    <group {...props} dispose={null} onPointerOver={(e) => e.stopPropagation()}>
      <mesh
        castShadow
        geometry={nodes.Coral.geometry}
        material={materials.CoralMaterial}
      />
      <mesh
        castShadow
        geometry={nodes.Sand.geometry}
        material={materials.SandMaterial}
      />
      <mesh
        geometry={nodes.See.geometry}
        material={materials.SeeMaterial}
      />
      <mesh
        castShadow
        geometry={nodes.Rocks_1.geometry}
        material={materials.CoralRockBlackMaterial}
      />
      <mesh
        castShadow
        geometry={nodes.Rocks_2.geometry}
        material={materials.CoralRockMaterial}
      />
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollution/ocean.glb");
