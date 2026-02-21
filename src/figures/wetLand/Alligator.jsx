import { useGLTF } from '@react-three/drei'

export function Alligator(props) {
  const { nodes, materials } = useGLTF('/models-3d/wetLand/alligator.glb')
  return (
    <group {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 4.5]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="node_id30_0"
                position={[-0.067, 0.2, 0.198]}
                rotation={[0, 1.045, 0]}
                scale={0.036}>
                <mesh
                  name="Object_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Object_4.geometry}
                  material={materials.material}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/wetLand/alligator.glb')