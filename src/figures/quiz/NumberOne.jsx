
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function NumberOne(props) {
  const { nodes, materials } = useGLTF('/models-3d/quiz/numberOne.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['3MFMeshParent_2'].geometry}
        material={materials.Material_1}
        position={[22.263, 0, 13.37]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/quiz/numberOne.glb')
