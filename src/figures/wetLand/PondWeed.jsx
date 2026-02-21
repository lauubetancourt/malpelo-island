import React from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

// 1. MATERIALES GLOBALES CACHEADOS
const stemMat = new THREE.MeshStandardMaterial({ color: "#1e3b12", roughness: 0.8 })
const leafMat = new THREE.MeshStandardMaterial({ color: "#3a6b24", roughness: 0.4 })
const detailMat = new THREE.MeshStandardMaterial({ color: "#5c8a2b", roughness: 0.6 })

export function PondWeed(props) {
  const { nodes } = useGLTF('/models-3d/wetLand/pondWeed.glb')
  
  return (
    <group {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI, 0, 0]}>
          <group name="PondWeed_Medfbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name="RootNode">
              <group name="PondWeed_Med">
                <group name="LOD0">
                  
                  {/* 2. SIN CASTSHADOW Y CON MATERIALES REUTILIZABLES */}
                  <mesh
                    name="LOD0_FrondStem_Mat_0"
                    receiveShadow
                    geometry={nodes.LOD0_FrondStem_Mat_0.geometry}
                    material={stemMat}
                  />
                  
                  <mesh
                    name="LOD0_PondWeedLeaflets_Mat_0"
                    receiveShadow
                    geometry={nodes.LOD0_PondWeedLeaflets_Mat_0.geometry}
                    material={leafMat}
                  />
                  
                  <mesh
                    name="LOD0_PondWeed_Med_Mat_0"
                    receiveShadow
                    geometry={nodes.LOD0_PondWeed_Med_Mat_0.geometry}
                    material={detailMat}
                  />

                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/wetLand/pondWeed.glb')