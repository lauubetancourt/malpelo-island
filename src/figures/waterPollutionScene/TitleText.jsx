import { Center, Text3D } from "@react-three/drei";

const TitleText = () => {
  return (
    <>
      <Center top left position={[1, 5, 0]}>
        <Text3D
          font="/fonts/blue-ocean.json"
          bevelEnabled
          bevelSize={0.03}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={0.75}
          letterSpacing={0.2}
          size={0.9}
          rotation={[0, 30, 0]}
        >
          {`Contaminación \n    del agua`}
          <meshStandardMaterial color="#FF1493"/>
        </Text3D>
      </Center>
    </>
  );
};

export default TitleText;
