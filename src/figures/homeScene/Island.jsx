import React from "react";

/**
 * Island Component
 * 
 * This component renders a 3D island using a cone geometry.
 * The island is positioned at coordinates [0, 10, 0].
 * 
 * @returns {JSX.Element} The rendered island mesh.
 */
const Island = () => {
  return (
    <mesh position={[0, 10, 0]}>
      {/* Define the geometry of the island as a cone with a base radius of 50, height of 30, and 20 radial segments */}
      <coneGeometry args={[50, 30, 20]} />
      
      {/* Apply a physical material to the cone with specified color, roughness, and metalness */}
      <meshPhysicalMaterial
        color={0xf8e5c3}
        roughness={0.6}
        metalness={0.2}
      />
    </mesh>
  );
};

export default Island;
