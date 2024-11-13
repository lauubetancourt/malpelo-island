import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function BlueWhale(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models-3d/waterAcidification/blueWhale.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      actions[Object.keys(actions)[0]].play()
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={4.5}> 
          <group name="WhaleAnim03fbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="pSphere2" position={[2.061, 0.381, 1.034]} />
                <group name="polySurface1" />
                <group name="locator3" position={[0, 0.343, 0.666]} rotation={[0.035, 0, 0]} >
                  <group name="Object_7" >
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_37"
                      geometry={nodes.Object_37.geometry}
                      material={materials.lambert1}
                      skeleton={nodes.Object_37.skeleton}
                    />
                    <group name="Object_36" />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/waterAcidification/blueWhale.glb')
