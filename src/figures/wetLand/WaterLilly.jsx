import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three' // Importamos THREE para crear los materiales globales

// 1. OPTIMIZACIÓN DE MEMORIA: Creamos los materiales UNA SOLA VEZ aquí afuera.
const stemMaterial = new THREE.MeshStandardMaterial({ color: "#172e0d", roughness: 0.9 })
const leafMaterial = new THREE.MeshStandardMaterial({ color: "#2a4f15", roughness: 0.15, metalness: 0.1 })
const centerMaterial = new THREE.MeshStandardMaterial({ color: "#498528", roughness: 0.5 })

export function WaterLilly(props) {
  const { nodes } = useGLTF('/models-3d/wetLand/waterLily.glb')
  
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          
          {/* 2. OPTIMIZACIÓN DE SOMBRAS: 
              Quitamos "castShadow" (ya no proyectan sombra pesada)
              Dejamos "receiveShadow" (para que el cocodrilo sí les haga sombra a ellas) 
              Usamos la propiedad "material" llamando a las variables de arriba */}
          
          <mesh
            receiveShadow
            geometry={nodes.LOD0_WaterLilyStem_Mat_0.geometry}
            material={stemMaterial}
          />

          <mesh
            receiveShadow
            geometry={nodes.LOD0_LilyPad_01_Mat_0.geometry}
            material={leafMaterial}
          />

          <mesh
            receiveShadow
            geometry={nodes.LOD0_WaterLily_Med_Mat_0.geometry}
            material={centerMaterial}
          />

        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/wetLand/waterLily.glb')