import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function NumberTwo(props) {
  const { nodes, materials } = useGLTF('/models-3d/quiz/numberTwo.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['3MFMeshParent_3'].geometry}
        material={materials.Material_1}
        position={[0, 0, 14.494]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/quiz/numberTwo.glb')
