import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function GlassBottle(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/waterPollutionQuiz/glassBottle.glb"
  );
  return (
    <group {...props} dispose={null}>
      <mesh
        name="GlassBottle"
        castShadow
        receiveShadow
        geometry={nodes.GARRAFA_VIDRO_FORA_0.geometry}
        material={materials.VIDRO_FORA}
      />
      <mesh
        name="GlassBottle"
        castShadow
        receiveShadow
        geometry={nodes.GARRAFA_VIDRO_DENTRO_0.geometry}
        material={materials.VIDRO_DENTRO}
      />
      <mesh
        name="GlassBottle"
        castShadow
        receiveShadow
        geometry={nodes.GARRAFA_LIQUIDO_0.geometry}
        material={materials.LIQUIDO}
      />
      <mesh
        name="GlassBottle"
        castShadow
        receiveShadow
        geometry={nodes.GARRAFA_TAMPA_0.geometry}
        material={materials.TAMPA}
      />
      <mesh
        name="GlassBottle"
        castShadow
        receiveShadow
        geometry={nodes.GARRAFA_LIMITE_LIQUIDO_0.geometry}
        material={materials.LIMITE_LIQUIDO}
      />
    </group>
  );
}

useGLTF.preload("/models-3d/waterPollutionQuiz/glassBottle.glb");
