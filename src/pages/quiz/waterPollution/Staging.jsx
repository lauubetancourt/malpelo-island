import { Environment } from "@react-three/drei";
import React from "react";

const Staging = () => {
  return (
    <Environment
      ground={{
        height: 15,
        radius: 100,
        scale: 100,
      }}
      files={"/hdris/cafe.hdr"}
      background={true}
    />
  );
};

export default Staging;
