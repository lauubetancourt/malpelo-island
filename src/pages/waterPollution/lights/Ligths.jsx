import React from "react";

const Ligths = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight
        castShadow
        position={[15, 20, 0]}
        intensity={5}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <directionalLight
        castShadow
        position={[10, 10, 20]}
        intensity={0.5}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <directionalLight
        castShadow
        position={[10, 10, -20]}
        intensity={0.5}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
    </>
  );
};

export default Ligths;
