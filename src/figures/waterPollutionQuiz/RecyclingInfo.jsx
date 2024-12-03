import { Text } from "@react-three/drei";
import React from "react";

const RecyclingInfo = () => {
  return (
    <>
      <mesh position={[0, 105, 0]}>
        <boxGeometry args={[180, 200, 0]} />
        <meshStandardMaterial color="white" />
        <Text
          color="black"
          fontSize={20}
          position={[0, 0, 1]}
          anchorX={"center"}
          anchorY={"middle"}
        >
          {`Residuos\naprovechables\nPlástico\nCartón\nVidrio\nPapel\nMetales`}
        </Text>
      </mesh>

      <mesh position={[200, 105, 0]}>
        <boxGeometry args={[180, 200, 0]} />
        <meshStandardMaterial color="#006400" />
        <Text
          color="white"
          fontSize={22}
          position={[0, 1, 1]}
          anchorX={"center"}
          anchorY={"middle"}
        >
          {`Residuos\norgánicos\naprovechables\nRestos de \nalimentos`}
        </Text>
      </mesh>

      <mesh position={[400, 105, 0]}>
        <boxGeometry args={[180, 200, 0]} />
        <meshStandardMaterial color="black" />
        <Text
          color="white"
          fontSize={21}
          position={[0, 1, 1]}
          anchorX={"center"}
          anchorY={"middle"}
        >
          {`Residuos\nno aprovechables\nPapel y cartón\ncontaminado\nEnvoltorios`}
        </Text>
      </mesh>
    </>
  );
};

export default RecyclingInfo;
