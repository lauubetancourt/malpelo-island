const Ligths = () => {

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={5} 
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={100}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        castShadow 
      /> 

      <directionalLight 
        position={[-1, 5, 15]}
        intensity={8} 
        color={"#1C08B7"}
      />
    </>
  );

}

export default Ligths;
