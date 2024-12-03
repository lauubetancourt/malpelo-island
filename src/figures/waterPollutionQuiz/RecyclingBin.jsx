import React, { useRef } from "react";
import { Text, useGLTF } from "@react-three/drei";
import RecyclingInfo from "./RecyclingInfo";

export function RecyclingBin(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/waterPollutionQuiz/recycle.glb"
  );
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <group position={[187.143, 99.236, 0.019]}>
          <group position={[0, 99.236, 0.019]}>
            <mesh
              name="BlackRecyclingBin"
              castShadow
              receiveShadow
              geometry={nodes.door_01_0.geometry}
            >
              <meshStandardMaterial color="black" />
            </mesh>
            <mesh
              name="BlackRecyclingBin"
              castShadow
              receiveShadow
              geometry={nodes["01_2_01_0"].geometry}
              material={materials.material}
              position={[0, 67.741, -30.885]}
            />
          </group>
          <mesh
            name="BlackRecyclingBin"
            castShadow
            receiveShadow
            geometry={nodes.base_01_0.geometry}
            position={[0, -99.236, -0.019]}
          >
            <meshStandardMaterial color="black" />
          </mesh>
        </group>
        <group position={[0, 99.236, 0.019]}>
          <group position={[0, 99.236, 0.019]}>
            <mesh
              name="GreenRecyclingBin"
              castShadow
              receiveShadow
              geometry={nodes.door_2_02_0.geometry}
            >
              <meshStandardMaterial color="green" />
            </mesh>
            <mesh
              name="GreenRecyclingBin"
              castShadow
              receiveShadow
              geometry={nodes["01_3_02_0"].geometry}
              material={materials.material_1}
              position={[0, 67.741, -30.885]}
            />
          </group>
          <mesh
            name="GreenRecyclingBin"
            castShadow
            receiveShadow
            geometry={nodes.base_2_02_0.geometry}
            position={[0, -99.236, -0.019]}
          >
            <meshStandardMaterial color="green" />
          </mesh>
        </group>
        <group position={[-188.074, 99.236, 0.019]}>
          <group position={[0, 99.236, 0.019]}>
            <mesh
              name="WhiteRecyclingBin"
              castShadow
              receiveShadow
              geometry={nodes.door_3_03_0.geometry}
            >
              <meshStandardMaterial color="white" />
            </mesh>
            <mesh
              name="WhiteRecyclingBin"
              castShadow
              receiveShadow
              geometry={nodes["01_4_03_0"].geometry}
              material={materials.material_2}
              position={[0, 67.741, -30.885]}
            >
              <RecyclingInfo/>
            </mesh>
          </group>
          <mesh
            name="WhiteRecyclingBin"
            castShadow
            receiveShadow
            geometry={nodes.base_3_03_0.geometry}
            position={[0, -99.236, -0.019]}
          >
            <meshStandardMaterial color="white" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollutionQuiz/recycle.glb");
