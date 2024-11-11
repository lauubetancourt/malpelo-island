import React, { useRef, useState, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Stingray(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/models-3d/home/stingray.glb")
  const { actions } = useAnimations(animations, group)
  const [currentAction, setCurrentAction] = useState("GltfAnimation 0");

  useEffect(() => {
    actions[currentAction]?.fadeIn(0.05).play();

    return () => actions[currentAction]?.fadeOut(0.05).stop();
  }, [actions, currentAction]);

  console.log(actions)
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

useGLTF.preload("/models-3d/home/stingray.glb")