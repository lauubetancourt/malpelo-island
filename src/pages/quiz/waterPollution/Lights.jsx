import React from "react";

const Lights = () => {
  return (
    <>
      <ambientLight />
      <directionalLight position={[10, 10, 10]} intensity={5} />
    </>
  );
};

export default Lights;
