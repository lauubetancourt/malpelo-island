import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Crate(props) {
  const { nodes, materials } = useGLTF("/models-3d/waterPollution/crate.glb");
  return (
    <group {...props} dispose={null} scale={[4, 4, 4]}>
      <RigidBody type="dynamic" colliders="cuboid">
        <mesh
          castShadow
          geometry={nodes.Crate_01_GEO.geometry}
          material={materials.Crate_2x}
          position={[-1.965, 0, 0]}
        />
      </RigidBody>
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollution/crate.glb");
