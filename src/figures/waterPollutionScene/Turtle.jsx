import React, { useRef, useState, useEffect } from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Turtle(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models-3d/waterPollution/turtle.glb"
  );
  const { actions } = useAnimations(animations, group);
  const [currentAction, setCurrentAction] = useState("Swim Cycle");
  const [sub, get] = useKeyboardControls();

  useEffect(() => {
    actions[currentAction]?.fadeIn(0.5).play();

    return () => actions[currentAction]?.fadeOut(0.5).stop();
  }, [actions, currentAction]);

  const maxZ = 15;
  const initialZ = -8;
  const maxY = 8;
  const initialY = 2;
  const speed = 0.05;

  useFrame(() => {
    const { forward, back, up, down } = get();

    const currentGroup = group.current;
    if (!currentGroup) return;

    // Movimiento hacia adelante
    if (forward) {
      currentGroup.position.z = Math.min(currentGroup.position.z + speed, maxZ);
    }

    // Movimiento hacia atrás
    if (back) {
      currentGroup.position.z = Math.max(
        currentGroup.position.z - speed,
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
  });

  // useFrame(() => {
  //   if (group.current) {
  //     group.current.position.z += speed;

  //     if (group.current.position.z >= maxZ) {
  //       group.current.position.z = initialZ;
  //     }
  //   }
  // });

  return (
    <group ref={group} {...props} dispose={null} castShadow receiveShadow>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.075}
        >
          <group
            name="green_016_round5changes_johnsonfbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="green_juvenilearmature"
                  position={[-2.266, 2.989, -2.188]}
                  rotation={[-Math.PI / 2, 0, -3.117]}
                  scale={100}
                >
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_40"
                      geometry={nodes.Object_40.geometry}
                      material={materials.greeneye}
                      skeleton={nodes.Object_40.skeleton}
                    />
                    <skinnedMesh
                      name="Object_41"
                      geometry={nodes.Object_41.geometry}
                      material={materials.greeneyeouter}
                      skeleton={nodes.Object_41.skeleton}
                    />
                    <skinnedMesh
                      name="Object_43"
                      geometry={nodes.Object_43.geometry}
                      material={materials.greenbody}
                      skeleton={nodes.Object_43.skeleton}
                    />
                    <group
                      name="Object_39"
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                    <group
                      name="Object_42"
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                  </group>
                </group>
                <group
                  name="green_juvenileeye"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="green_juvenilemesh"
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

useGLTF.preload("/models-3d/waterPollution/turtle.glb");
