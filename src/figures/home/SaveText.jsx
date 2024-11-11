import { Center, Text3D } from "@react-three/drei";
import React from "react";

const SaveText = () => {
  return (
    <>
      <Center position={[0, 0, 0]}>
        <Text3D
          font="/fonts/bebas-neue-regular.json"
          bevelEnabled
          bevelSize={0.03}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={0.75}
          letterSpacing={0.2}
          size={120}
        >
          {`SAVE \n THE \n PLANET!`}
          <meshStandardMaterial color="#FFCC00" />
        </Text3D>
      </Center>
    </>
  );
};

export default SaveText;
