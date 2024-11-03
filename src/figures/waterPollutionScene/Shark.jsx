import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Shark = (props) => {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models-3d/waterPollution/shark.glb");

  const initialZ = -10; 
  const maxZ = 20; 
  const speed = 0.02;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
      group.current.position.x = Math.sin(t) * 3; // Oscilación en x
      group.current.position.y = Math.sin(t * 2) * 0.5; // Oscilación en y

      group.current.position.z += speed;
      if (group.current.position.z >= maxZ) {
        group.current.position.z = initialZ;
      }

      group.current.rotation.y = Math.sin(t * 2) * 0.1; // Rotación ligera en y
    }
  });

  return (
    <group ref={group} {...props} dispose={null} castShadow receiveShadow>
      <group name="Animated_underwater_shark" position={[10, 70, -12]} scale={3}>
        <group
          name="Model_9A_-_Blacktip_Shark"
          rotation={[-1.584, 0, 45]}
          scale={5.8}
        >
          <group name="Shark_Armature" rotation={[0, -1.571, 0]} scale={0.304}>
            <group
              name="BT_Shark_"
              rotation={[0, Math.PI / 2, 0]}
              scale={3.285}
            />
            <skinnedMesh
              name="BT_Shark__0"
              geometry={nodes.BT_Shark__0.geometry}
              material={materials.Diffuse}
              skeleton={nodes.BT_Shark__0.skeleton}
              castShadow
              receiveShadow
            />
            <skinnedMesh
              name="BT_Shark__1"
              geometry={nodes.BT_Shark__1.geometry}
              material={materials.Diffuse_Eye}
              skeleton={nodes.BT_Shark__1.skeleton}
              castShadow
              receiveShadow
            />
            <primitive object={nodes.Shark_Armature_rootJoint} />
          </group>
        </group>
        <group name="Camera_focus" position={[-8.541, -20.603, 0.633]} />
      </group>
    </group>
  );
};

useGLTF.preload("/models-3d/waterPollution/shark.glb");

export default Shark;
