import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Stingray(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models-3d/waterAcidification/stingray.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      actions[Object.keys(actions)[0]].play()
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="GLTF_created_0">
                <primitive object={nodes.GLTF_created_0_rootJoint} />
                <skinnedMesh
                  name="Object_7"
                  geometry={nodes.Object_7.geometry}
                  material={materials.SeaLifeMantaRayMIC}
                  skeleton={nodes.Object_7.skeleton}
                  castShadow
                  receiveShadow
                />
                <group name="SeaLifeMantaRaySKM_18">
                  <group name="SeaLifeMantaRaySKM_19" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/waterAcidification/stingray.glb')
