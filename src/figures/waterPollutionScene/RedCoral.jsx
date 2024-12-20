import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function RedCoral(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/waterPollution/redCoral.glb"
  );
  return (
    <RigidBody type="fixed" colliders="hull">
      <group {...props} dispose={null} scale={0.5}>
        <mesh
          castShadow
          geometry={nodes.Object_4.geometry}
          material={materials["Material.002"]}
          position={[0.076, 0.299, 0.059]}
          rotation={[-Math.PI, -0.087, -Math.PI]}
          scale={0.298}
        />
        <mesh
          castShadow
          geometry={nodes.Object_6.geometry}
          material={materials["Material.002"]}
          position={[0.076, 0.299, 0.059]}
          scale={0.298}
        />
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/models-3d/waterPollution/redCoral.glb");
