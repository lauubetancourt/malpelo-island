import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Ocean(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/waterAcidification/ocean.glb"
  );


  return (
    <group {...props} dispose={null} >
      <RigidBody type="fixed" colliders="hull">
        <mesh
          castShadow
          geometry={nodes.Coral.geometry}
          material={materials.coralMaterial}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="hull">
        <mesh
          castShadow
          geometry={nodes.Coral2.geometry}
          material={materials.coralMaterial2}
          position={[6.316, 0.712, -16.363]}
          rotation={[0.112, 0.006, 0.135]}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="hull">
        <mesh
          castShadow
          geometry={nodes.Coral3.geometry}
          material={materials.coralMaterial4}
          position={[14.495, 2.226, -1.401]}
          rotation={[0.116, 0.022, 0.185]}
          scale={0.053}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="hull">
        <mesh
          castShadow
          geometry={nodes.Coral4.geometry}
          material={materials["10010_Coral_v1.001"]}
          position={[-2.627, 0.601, 6.449]}
          rotation={[0.118, 0, 0]}
          scale={0.053}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="hull">
        <mesh
          castShadow
          geometry={nodes.Coral5.geometry}
          material={materials["10010_Coral_v1.002"]}
          position={[-11.052, 0.601, 12.703]}
          rotation={[0.118, 0, 0]}
          scale={0.053}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="hull">
        <mesh
          castShadow
          geometry={nodes.Coral6.geometry}
          material={materials.coralMaterial7}
          position={[12.484, 1.435, 17.765]}
          rotation={[0.116, 0.022, 0.185]}
          scale={0.053}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="hull">
        <mesh
          castShadow
          geometry={nodes.Coral7.geometry}
          material={materials["coralMaterial5.001"]}
          position={[11.977, 2.226, -4.045]}
          rotation={[0.116, 0.022, 0.185]}
          scale={0.053}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="hull">
        <mesh
          castShadow
          geometry={nodes.coral8.geometry}
          material={materials.coralMaterial6}
          position={[11.837, 1.293, 19.404]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.571}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="hull">
        <mesh
          castShadow
          geometry={nodes.Coral9.geometry}
          material={materials.coralMaterial3}
          position={[-13.563, -0.393, 13.079]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={0.3}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="hull">
        <mesh
          castShadow
          geometry={nodes.Coral10.geometry}
          material={materials["10010_Coral_v1.006"]}
          position={[8.568, 0.633, 12.435]}
          rotation={[0.118, 0, 0]}
          scale={0.053}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <mesh geometry={nodes.See.geometry} material={materials.SeeMaterial} />
      </RigidBody>
      <RigidBody type="fixed" colliders="hull">
        <mesh
          geometry={nodes.Rocks_1.geometry}
          material={materials.CoralRockBlackMaterial}
          castShadow={true}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="hull">
        <mesh
          geometry={nodes.Rocks_2.geometry}
          material={materials.CoralRockMaterial}
          castShadow={true}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="trimesh">
        <mesh geometry={nodes.Sand.geometry} receiveShadow={true}>
          <meshStandardMaterial color={"#EAD5AD"} />
        </mesh>
      </RigidBody>
    </group>
  );
}

useGLTF.preload("/models-3d/waterAcidification/ocean.glb");
