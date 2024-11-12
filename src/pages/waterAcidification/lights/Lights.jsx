import { SpotLight} from "@react-three/drei";

const Ligths = () => {

  return (
    <>

      <SpotLight 
        castShadow
        position={[5, 10, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1.5} 
        distance={20} 
      />

    </>
  );

}

export default Ligths;
