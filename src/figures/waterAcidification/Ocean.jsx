import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Ocean(props) {
  const { nodes, materials } = useGLTF('/models-3d/waterAcidification/ocean.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Coral.geometry}
        material={materials.CoralMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sand.geometry}
        material={materials.SandMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.See.geometry}
        material={materials.SeeMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Coral2.geometry}
        material={materials['CoralMaterial.001']}
        position={[6.316, 0.712, -16.363]}
        rotation={[0.112, 0.006, 0.135]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CoralRed.geometry}
        material={materials['10010_Coral_v1']}
        position={[14.495, 2.226, -1.401]}
        rotation={[0.116, 0.022, 0.185]}
        scale={0.053}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CoralRed001.geometry}
        material={materials['10010_Coral_v1.001']}
        position={[-2.627, 0.601, 6.449]}
        rotation={[0.118, 0, 0]}
        scale={0.053}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['21488_Tree_Coral_v2_NEW'].geometry}
        material={materials._21488_Tree_Coral_v221488_Tree_Coral_v2}
        position={[11.837, 1.293, 19.404]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.571}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['21488_Tree_Coral_v2_NEW001'].geometry}
        material={materials['_21488_Tree_Coral_v221488_Tree_Coral_v2.001']}
        position={[-13.563, -0.393, 13.079]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.3}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CoralRed002.geometry}
        material={materials['10010_Coral_v1.002']}
        position={[-11.052, 0.601, 12.703]}
        rotation={[0.118, 0, 0]}
        scale={0.053}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CoralRed003.geometry}
        material={materials['10010_Coral_v1.003']}
        position={[12.484, 1.435, 17.267]}
        rotation={[0.116, 0.022, 0.185]}
        scale={0.053}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CoralRed004.geometry}
        material={materials['10010_Coral_v1.004']}
        position={[7.658, -0.033, 17.902]}
        rotation={[0.116, 0.022, 0.185]}
        scale={0.053}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CoralRed005.geometry}
        material={materials['10010_Coral_v1.005']}
        position={[11.977, 2.226, -4.045]}
        rotation={[0.116, 0.022, 0.185]}
        scale={0.053}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rocks_1.geometry}
        material={materials.CoralRockBlackMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rocks_2.geometry}
        material={materials.CoralRockMaterial}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/waterAcidification/ocean.glb')