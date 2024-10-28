import { useGLTF } from '@react-three/drei'

const Ocean = (props) => {
  const { nodes, materials } = useGLTF('/models-3d/waterPollution/ocean.glb')
  return (
    <group {...props} dispose={null}>
      <group name="Scene">
        <mesh name="Cube" geometry={nodes.Cube.geometry} material={materials.Material} />
        <group name="Under_The_Sea" rotation={[Math.PI / 2, 0, 0]} scale={0.1}>
          <mesh
            name="Under_The_Sea_2"
            geometry={nodes.Under_The_Sea_2.geometry}
            material={materials.Blue_Feelers}
          />
          <mesh
            name="Under_The_Sea_3"
            geometry={nodes.Under_The_Sea_3.geometry}
            material={materials.Red_Feelers}
          />
          <mesh
            name="Under_The_Sea_4"
            geometry={nodes.Under_The_Sea_4.geometry}
            material={materials.Purple_Feelers}
          />
          <mesh
            name="Under_The_Sea_6"
            geometry={nodes.Under_The_Sea_6.geometry}
            material={materials.Sea_Bottom}
          />
          <mesh
            name="Under_The_Sea_8"
            geometry={nodes.Under_The_Sea_8.geometry}
            material={materials.Clownfish2}
          />
          <mesh
            name="Under_The_Sea_9"
            geometry={nodes.Under_The_Sea_9.geometry}
            material={materials.Clownfish}
          />
          <mesh
            name="Under_The_Sea_11"
            geometry={nodes.Under_The_Sea_11.geometry}
            material={materials.Coral_Rock1}
          />
          <mesh
            name="Under_The_Sea_12"
            geometry={nodes.Under_The_Sea_12.geometry}
            material={materials.Coral_Rock2}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/waterPollution/ocean.glb')

export default Ocean;