const Lights = () => {
  return (
    <>
      {/* 1. Luz Ambiental: Tono verdoso/grisáceo suave para la turbidez */}
      <ambientLight intensity={1.5} color={"#a3ab9c"} />

      {/* 2. Luz Principal (Sol): Luz cálida tropical penetrando el agua */}
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={2.5} 
        color={"#fff6e5"} /* Un blanco ligeramente cálido/amarillento */
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={100}
        shadow-camera-left={-100}
        shadow-camera-right={100}
        shadow-camera-top={100}
        shadow-camera-bottom={-100}
        castShadow 
      /> 

      {/* 3. Luz de Relleno (Agua): Reemplazamos el azul profundo por verde estuarino */}
      <directionalLight 
        position={[-1, 5, 15]}
        intensity={2} /* Bajamos la intensidad para que no queme la escena */
        color={"#415846"} /* El verde oliva oscuro que definimos antes */
      />
    </>
  );
};

export default Lights;