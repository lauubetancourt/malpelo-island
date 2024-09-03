import React from "react";

/**
 * Moon Component
 * 
 * This component renders a 3D moon using a sphere geometry.
 * The moon is positioned at coordinates [0, 100, -250].
 * 
 * @returns {JSX.Element} The rendered moon mesh.
 */
const Moon = () => {
  return (
    <mesh position={[0, 100, -250]}>
      {/* Define the geometry of the moon as a sphere with a radius of 20, 200 width segments, and 200 height segments */}
      <sphereGeometry args={[20, 200, 200]} />
      
      {/* Apply a physical material to the sphere with specified color, roughness, metalness, transmission, and clear coat */}
      <meshPhysicalMaterial
        color={0xcfced5}
        roughness={0.8}
        metalness={0.0}
        transmission={0.0}
        clearCoat={0.1}
      />
    </mesh>
  );
};

export default Moon;
