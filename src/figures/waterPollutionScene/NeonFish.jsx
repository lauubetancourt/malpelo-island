import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

const NeonFish = (props) => {
  const group = useRef();
  const colliderRef = useRef();
  const { nodes, materials } = useGLTF(
    "/models-3d/waterPollution/neonFish.glb"
  );

  const [speed, setSpeed] = useState(-0.08);
  const [rotation, setRotation] = useState(Math.PI);

  useFrame(() => {
    if (colliderRef.current) {
      const currentTranslation = colliderRef.current.translation();

      colliderRef.current.setTranslation({
        x: 16,
        y: 6,
        z: (currentTranslation.z += speed),
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
      position={[16, 6, 10]}
      rotation={[0, 30, 0]}
      restitution={0}
      friction={1}
      enabledRotations={[false, false, false]}
      type="dynamic"
      colliders={false}
      onCollisionEnter={handleCollision}
    >
      <group ref={group} {...props} dispose={null}>
        <group position={[-0.372, 0.903, 0]} scale={0.415}>
          <mesh
            castShadow
            geometry={nodes.Cube001_1.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <group position={[2.172, 2.076, -0.539]} scale={0.415}>
          <mesh
            castShadow
            geometry={nodes.Cube002_1.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <group position={[-3.943, 1.878, -1.238]} scale={0.415}>
          <mesh
            castShadow
            geometry={nodes.Cube003_1.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <group position={[-1.599, 3.399, -1.011]} scale={0.415}>
          <mesh
            castShadow
            geometry={nodes.Cube004_1.geometry}
            material={materials["Material.001"]}
          />
        </group>
      </group>
      <CuboidCollider
        args={[2.5, 0.8, 0.5]}
        position={[0, 1, 0]}
      />
    </RigidBody>
  );
};

useGLTF.preload("/models-3d/waterPollution/neonFish.glb");

export default NeonFish;
