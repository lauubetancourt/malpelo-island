import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Highlighter(props) {
  const { nodes, materials } = useGLTF('/models-3d/waterAcidificationQuiz/highlighter.glb')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Node1.geometry} material={materials.x1} />
    </group>
  )
}

useGLTF.preload('/models-3d/waterAcidificationQuiz/highlighter.glb')
