import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

export function Mullet(props) {
  const group = useRef();
  const colliderRef = useRef();
  const { nodes, materials } = useGLTF("/models-3d/wetLand/mullet.glb");

  const [speed, setSpeed] = useState(-0.08);
  const [rotation, setRotation] = useState(Math.PI);

  useFrame(() => {
    if (colliderRef.current) {
      const currentTranslation = colliderRef.current.translation();

      colliderRef.current.setTranslation({
        x: props.position[0],
        y: props.position[1],
        z: (currentTranslation.z -= speed),
      });
    }
  });

  const handleCollision = () => {
    setSpeed(speed * -1);
    setRotation(rotation - Math.PI);
    group.current.rotation.y = rotation;
  };
  
  return (
    <RigidBody
      ref={colliderRef}
      gravityScale={0}
      position={props.position}
      restitution={0}
      friction={1}
      enabledRotations={[false, false, false]}
      type="dynamic"
      colliders={false}
      onCollisionEnter={handleCollision}
    >
      <group ref={group} scale={props.scale} dispose={null}>
        <group position={[-3.611, 0.041, 1.516]} rotation={[0, 0.29, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pasted__pSphere1_lambert2_0.geometry}
            material={materials.lambert2}
            position={[4.002, -0.11, -0.6]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.fish_body_main_lambert2_0.geometry}
          material={materials.lambert2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.fish_fin_top_lambert2_0.geometry}
          material={materials.lambert2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.fish_tail_main_lambert2_0.geometry}
          material={materials.lambert2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.fish_fin_back_lambert2_0.geometry}
          material={materials.lambert2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pPlane1_lambert2_0.geometry}
          material={materials.lambert2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pCube1_lambert2_0.geometry}
          material={materials.lambert2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.pSphere1_lambert2_0.geometry}
          material={materials.lambert2}
        />
      </group>
      <CuboidCollider args={[1, 0.8, 2.8]} position={[0, 1, 0]} />
    </RigidBody>
  );
}

useGLTF.preload("/models-3d/wetLand/mullet.glb");
