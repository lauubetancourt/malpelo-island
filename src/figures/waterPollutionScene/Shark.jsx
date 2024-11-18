import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function Shark(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models-3d/waterPollution/great_white_shark.glb"
  );
  const { actions } = useAnimations(animations, group);

  const [currentAction, setCurrentAction] = useState("Shark_Armature|Swim");
  const [sub, get] = useKeyboardControls();

  useEffect(() => {
    const currentAnimation = actions[currentAction];
    if (currentAnimation) {
      currentAnimation.reset().fadeIn(0.5).play();

      if (currentAction === "Shark_Armature|Bite") {
        currentAnimation.setLoop(THREE.LoopOnce);
        currentAnimation.clampWhenFinished = true;

        const timeout = setTimeout(() => {
          setCurrentAction("Shark_Armature|Swim2");
        }, currentAnimation.getClip().duration * 1000);

        return () => clearTimeout(timeout);
      }
    }

    return () => currentAnimation?.fadeOut(0.5).stop();
  }, [actions, currentAction]);
  const minZ = 584;
  const initialZ = 602;
  const maxY = 8;
  const initialY = 2;
  const speed = 0.05;

  useFrame(() => {
    const { forward, back, bite, up, down } = get();

    const currentGroup = group.current;
    if (!currentGroup) return;

    // Movimiento hacia adelante
    if (forward) {
      currentGroup.position.z = Math.max(currentGroup.position.z - speed, minZ);
    }

    if (back) {
      currentGroup.position.z = Math.min(
        currentGroup.position.z + speed,
        initialZ
      );
    }

    // Movimiento hacia arriba
    if (up) {
      currentGroup.position.y = Math.min(currentGroup.position.y + speed, maxY);
    }

    // Movimiento hacia abajo
    if (down) {
      currentGroup.position.y = Math.max(
        currentGroup.position.y - speed,
        initialY
      );
    }

    if (bite) {
      setCurrentAction("Shark_Armature|Bite");
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          position={[-0.289, 0.11, -73.898]}
          rotation={[-Math.PI / 2, -0.004, -Math.PI]}
          scale={0.004}
        >
          <group
            name="46e90fa384ec4dd780b63e7ee83669f4fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Shark_Armature"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_21"
                      geometry={nodes.Object_21.geometry}
                      material={materials.Material}
                      skeleton={nodes.Object_21.skeleton}
                    />
                    <group
                      name="Object_20"
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                  </group>
                </group>
                <group
                  name="RetopoFlow001"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollution/great_white_shark.glb");
