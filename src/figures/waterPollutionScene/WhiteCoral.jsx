import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function WhiteCoral(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/waterPollution/whiteCoral.glb"
  );
  return (
    <RigidBody type="fixed" colliders="hull">
      <group {...props} dispose={null} scale={2}>
        <group
          position={[0.822, -10.602, -11.56]}
          rotation={[-1.857, 1.413, 1.861]}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Object_2.geometry}
            material={materials.PRI_13376}
          />
          <mesh
            castShadow
            geometry={nodes.Object_3.geometry}
            material={materials.PRI_13376}
          />
          <mesh
            castShadow
            geometry={nodes.Object_4.geometry}
            material={materials.PRI_13376}
          />
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/models-3d/waterPollution/whiteCoral.glb");
