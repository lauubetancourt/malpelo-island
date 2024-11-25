import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

const StripedFish = (props) => {
  const group = useRef();
  const colliderRef = useRef();
  const { nodes, materials } = useGLTF(
    "/models-3d/waterPollution/stripedFish.glb"
  );

  const [speed, setSpeed] = useState(-0.08);

  useFrame(() => {
    if (colliderRef.current) {
      const currentTranslation = colliderRef.current.translation();

      colliderRef.current.setTranslation({
        x: currentTranslation.x,
        y: currentTranslation.y,
        z: currentTranslation.z + speed,
      });
    }
  });

  const handleCollision= () => {
    setSpeed(speed * -1)
  }

  return (
    <RigidBody
      ref={colliderRef}
      gravityScale={3}
      position={[15, 6, -20]}
      type="dynamic"
      colliders={false}
      onCollisionEnter={handleCollision}
    >
      <group ref={group} {...props} dispose={null}>
        <group position={[-0.219, 0.76, 0]} scale={0.453}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_1.geometry}
            material={materials["Material.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001_2.geometry}
            material={materials["Material.003"]}
          />
        </group>
        <group position={[-2.164, 2.052, -0.457]} scale={0.453}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002_1.geometry}
            material={materials["Material.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube002_2.geometry}
            material={materials["Material.003"]}
          />
        </group>
        <group position={[3.601, 1.981, 0.893]} scale={0.453}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_1.geometry}
            material={materials["Material.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube003_2.geometry}
            material={materials["Material.003"]}
          />
        </group>
        <group position={[0.958, 3.535, 0.201]} scale={0.453}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004.geometry}
            material={materials["Material.001"]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube004_1.geometry}
            material={materials["Material.003"]}
          />
        </group>
      </group>
      <CuboidCollider args={[2, 2, 2]} />
    </RigidBody>
  );
};

useGLTF.preload("/models-3d/waterPollution/stripedFish.glb");

export default StripedFish;
