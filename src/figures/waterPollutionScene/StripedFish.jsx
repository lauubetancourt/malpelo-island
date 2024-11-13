import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const StripedFish = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF(
    "/models-3d/waterPollution/stripedFish.glb"
  );

  const maxX = -10;
  const initialX = 10;
  const speed = -0.08;

  useFrame(() => {
    if (group.current) {
      group.current.position.x += speed;

      if (group.current.position.x <= maxX) {
        group.current.position.x = initialX;
      }
    }
  });

  return (
    <group ref={group} {...props} position={[12, 5, -20]} dispose={null}>
      <group position={[-0.219, 0.76, 0]} scale={0.453}>
        <mesh
          castShadow
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
          geometry={nodes.Cube002_1.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          geometry={nodes.Cube002_2.geometry}
          material={materials["Material.003"]}
        />
      </group>
      <group position={[3.601, 1.981, 0.893]} scale={0.453}>
        <mesh
          castShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials["Material.003"]}
        />
      </group>
      <group position={[0.958, 3.535, 0.201]} scale={0.453}>
        <mesh
          castShadow
          geometry={nodes.Cube004.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          geometry={nodes.Cube004_1.geometry}
          material={materials["Material.003"]}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/models-3d/waterPollution/stripedFish.glb");

export default StripedFish;
