import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export function Octopus(props) {
  const { nodes, materials } = useGLTF('/models-3d/waterAcidification/octopus.glb')
  return (
    <RigidBody type="fixed" colliders="cuboid">
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.octopus1.geometry}
        material={materials.Material_0}
        castShadow={true}
      />
    </group>
    </RigidBody>
  )
}

useGLTF.preload('/models-3d/waterAcidification/octopus.glb')
