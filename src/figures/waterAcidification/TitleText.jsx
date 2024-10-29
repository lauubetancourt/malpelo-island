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
          size={1.4}
          rotation={[0, 29.9, 0]}
        >
          {`Acidificación \n    de los océanos`}
          <meshStandardMaterial color="#5C0A13"/>
        </Text3D>
      </Center>
    </>
  );
};

export default TitleText;
