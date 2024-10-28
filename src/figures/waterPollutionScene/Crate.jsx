import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Crate(props) {
  const { nodes, materials } = useGLTF('/models-3d/waterPollution/crate.glb')
  return (
    <group {...props} dispose={null} scale={[4, 4, 4]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Crate_01_GEO.geometry}
        material={materials.Crate_2x}
        position={[-1.965, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/waterPollution/crate.glb')