import { useGLTF } from '@react-three/drei'

export function Tortoise(props) {
  const { nodes, materials } = useGLTF('/models-3d/wetLand/tortoise.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_9.geometry}
        material={materials.stone}
        position={[0, -0.069, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_6.geometry}
        material={materials.stone}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_12.geometry}
        material={materials.material}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/wetLand/tortoise.glb')