import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

export function Shark(props) {
  const group = useRef();
  const colliderRef = useRef();
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

  const [speed, setSpeed] = useState(0.05);
  const [rotation, setRotation] = useState(Math.PI);

  useFrame(() => {
    const { forward, bite, up, down } = get();

    if (!colliderRef.current) return;

    if (forward) {
      colliderRef.current.setTranslation({
        x: colliderRef.current.translation().x,
        y: colliderRef.current.translation().y,
        z: colliderRef.current.translation().z - speed,
      });
    }

    if (up) {
      colliderRef.current.setTranslation({
        x: colliderRef.current.translation().x,
        y: colliderRef.current.translation().y + speed,
        z: colliderRef.current.translation().z,
      });
    }

    if (down) {
      colliderRef.current.setTranslation({
        x: colliderRef.current.translation().x,
        y: colliderRef.current.translation().y - speed,
        z: colliderRef.current.translation().z,
      });
    }

    if (bite) {
      setCurrentAction("Shark_Armature|Bite");
    }
  });

  const handleCollision = ({ other }) => {
    if (other.rigidBodyObject.name === "rbSea") {
      setSpeed(speed * -1);
      setRotation(rotation - Math.PI);
      group.current.rotation.y = rotation;
    }
  };

  return (
    <RigidBody
      ref={colliderRef}
      position={[8, 6, 8]}
      gravityScale={0}
      restitution={0}
      friction={1}
      enabledRotations={[false, false, false]}
      type="dynamic"
      colliders={false}
      onCollisionEnter={handleCollision}
    >
      <group ref={group} {...props} dispose={null}>
        <group name="Sketchfab_Scene">
          <group
            name="Sketchfab_model"
            position={[0, 0, 0]}
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
      <CuboidCollider
        args={[11, 4.5, 4]}
        position={[1.5, 2, 0]}
        rotation={[0, 30, 0]}
      />
    </RigidBody>
  );
}

useGLTF.preload("/models-3d/waterPollution/great_white_shark.glb");
