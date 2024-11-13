import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Octopus(props) {
  const { nodes, materials } = useGLTF('/models-3d/waterAcidification/octopus.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.octopus1.geometry}
        material={materials.Material_0}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/waterAcidification/octopus.glb')
