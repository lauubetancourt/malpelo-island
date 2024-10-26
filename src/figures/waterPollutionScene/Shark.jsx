import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Shark = (props) => {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models-3d/waterPollution/shark.glb')

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Animated_underwater_shark">
        <group name="Model_9A_-_Blacktip_Shark" rotation={[-1.584, 0, 5]} scale={5.8}>
          <group name="Shark_Armature" rotation={[0, -1.571, 0]} scale={0.304}>
            <group name="BT_Shark_" rotation={[0, Math.PI / 2, 0]} scale={3.285} />
            <skinnedMesh
              name="BT_Shark__0"
              geometry={nodes.BT_Shark__0.geometry}
              material={materials.Diffuse}
              skeleton={nodes.BT_Shark__0.skeleton}
            />
            <skinnedMesh
              name="BT_Shark__1"
              geometry={nodes.BT_Shark__1.geometry}
              material={materials.Diffuse_Eye}
              skeleton={nodes.BT_Shark__1.skeleton}
            />
            <primitive object={nodes.Shark_Armature_rootJoint} />
          </group>
        </group>
        <group name="Camera_focus" position={[-8.541, -20.603, 0.633]} />
      </group>
    </group>
  )
}

useGLTF.preload('/models-3d/waterPollution/shark.glb')

export default Shark;