import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

const StripedFish = (props) => {
  const group = useRef();
  const colliderRef = useRef();
  const { nodes, materials } = useGLTF(
    "/models-3d/waterAcidification/stripedFish.glb"
  );

  const [speed, setSpeed] = useState(-0.08);
  const [rotation, setRotation] = useState(Math.PI);

  useFrame(() => {
    if (colliderRef.current) {
      const currentTranslation = colliderRef.current.translation();

      colliderRef.current.setTranslation({
        x: currentTranslation.x + speed,
        y: 6,
        z: -20,
      });
    }
  });

  const handleCollision= () => {
    setSpeed(speed * -1)
    setRotation(rotation - Math.PI)
    group.current.rotation.y = rotation;
    console.log(group.current.rotation.y)
  }


  return (
    <RigidBody
      ref={colliderRef}
      gravityScale={0}
      position={[8, 6, -20]}
      restitution={0}
      friction={1}
      enabledRotations={[false, false, false]}
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
      <CuboidCollider args={[6, 2, 0.2]} position={[0.7, 2, 0]}/>
    </RigidBody>
  );
};

useGLTF.preload("/models-3d/waterAcidification/stripedFish.glb");

export default StripedFish;
