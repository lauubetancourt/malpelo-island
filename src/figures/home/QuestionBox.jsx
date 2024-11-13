import React from 'react'
import { useGLTF } from '@react-three/drei'

export function QuestionBox(props) {
  const { nodes, materials } = useGLTF('/models-3d/home/question_box.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube_lambert2_0.geometry}
        material={materials.lambert2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Question_Bottom_lambert2_0.geometry}
        material={materials.lambert2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Question_Top_lambert2_0.geometry}
        material={materials.lambert2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Question_Top1_lambert2_0.geometry}
        material={materials.lambert2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Question_Bottom1_lambert2_0.geometry}
        material={materials.lambert2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Question_Top2_lambert2_0.geometry}
        material={materials.lambert2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Question_Bottom2_lambert2_0.geometry}
        material={materials.lambert2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Question_Top3_lambert2_0.geometry}
        material={materials.lambert2}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Question_Bottom3_lambert2_0.geometry}
        material={materials.lambert2}
      />
    </group>
  )
}

useGLTF.preload('/models-3d/home/question_box.glb')