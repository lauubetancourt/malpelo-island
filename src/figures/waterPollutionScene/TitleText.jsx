import { Center, Text3D } from "@react-three/drei";

const TitleText = () => {
  return (
    <>
      <Center top left position={[1, 4, 0]}>
        <Text3D
          font="/fonts/blue-ocean.json"
          bevelEnabled
          bevelSize={0.03}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={0.75}
          letterSpacing={0.2}
          size={1}
          rotation={[0, 30, 0]}
        >
          {`Ciénaga Grande de \n    Santa Marta`}
          <meshStandardMaterial
            color="#FFD100"
            emissive="#FFD100"
            emissiveIntensity={
              0.5
            } /* Ajusta entre 0.2 y 0.8 para que "brille" ligeramente */
            toneMapped={false}
          />
        </Text3D>
      </Center>
    </>
  );
};

export default TitleText;
