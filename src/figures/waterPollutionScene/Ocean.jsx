import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Ocean({
  waterColor = "hsl(150, 30%, 35%)",
  sandColor = "hsl(32, 32%, 25%)",
  ...props
}) {
  const { nodes, materials } = useGLTF("/models-3d/waterPollution/ocean.glb");

  return (
    <group {...props} dispose={null} onPointerOver={(e) => e.stopPropagation()}>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          visible={false}
          castShadow
          geometry={nodes.Coral.geometry}
          material={materials.CoralMaterial}
        />
      </RigidBody>

      <RigidBody name="rbSea" type="fixed" colliders="trimesh">
        <mesh geometry={nodes.See.geometry} material={materials.SeeMaterial}>
          <meshStandardMaterial color={waterColor} />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          visible={false}
          castShadow
          geometry={nodes.Rocks_2.geometry}
          material={materials.CoralRockMaterial}
        />
      </RigidBody>

      <RigidBody type="fixed" colliders="trimesh">
        <mesh geometry={nodes.Sand.geometry} receiveShadow={true}>
          <meshStandardMaterial color={sandColor} />
        </mesh>
      </RigidBody>
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollution/ocean.glb");
