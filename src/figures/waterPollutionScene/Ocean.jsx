import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

export function Ocean(props) {
  const { nodes, materials } = useGLTF("/models-3d/waterPollution/ocean.glb");
  return (
    <group {...props} dispose={null} onPointerOver={(e) => e.stopPropagation()}>
      
      {/* CORALES OCULTOS */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          visible={false} /* <--- Agregamos esto */
          castShadow
          geometry={nodes.Coral.geometry}
          material={materials.CoralMaterial}
        />
      </RigidBody>

      <RigidBody name="rbSea" type="fixed" colliders="trimesh">
        <mesh geometry={nodes.See.geometry} material={materials.SeeMaterial}>
          <meshStandardMaterial color={"rgba(65, 88, 70, 0.85)"} />
        </mesh>
      </RigidBody>

      {/* ROCAS OCULTAS */}
      <RigidBody type="fixed" colliders="cuboid">
        <mesh
          visible={false} /* <--- Agregamos esto */
          castShadow
          geometry={nodes.Rocks_2.geometry}
          material={materials.CoralRockMaterial}
        />
      </RigidBody>

      <RigidBody type="fixed" colliders="trimesh">
        <mesh geometry={nodes.Sand.geometry} receiveShadow={true}>
          <meshStandardMaterial color={"rgba(48, 38, 30, 1.0)"} />
        </mesh>
      </RigidBody>
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollution/ocean.glb");