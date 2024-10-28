import { useGLTF } from '@react-three/drei'

const NeonFish = (props) => {
  const { nodes, materials } = useGLTF('/models-3d/waterPollution/neonFish.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[-0.372, 0.903, 0]} scale={0.415}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['Material.001']}
        />
      </group>
      <group position={[2.172, 2.076, -0.539]} scale={0.415}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_1.geometry}
          material={materials['Material.001']}
        />
      </group>
      <group position={[-3.943, 1.878, -1.238]} scale={0.415}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials['Material.001']}
        />
      </group>
      <group position={[-1.599, 3.399, -1.011]} scale={0.415}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_1.geometry}
          material={materials['Material.001']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/waterPollution/neonFish.glb')

export default NeonFish;