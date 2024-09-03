import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Ocean Component
 * 
 * This component renders a dynamic 3D ocean using a plane geometry.
 * The ocean surface is animated to simulate waves.
 * 
 * @returns {JSX.Element} The rendered ocean mesh.
 */
const Ocean = () => {
  const planeRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const plane = planeRef.current;
    const { array } = plane.geometry.attributes.position;

    // Animate the z-coordinate of each vertex to create wave effect
    for (let i = 0; i < array.length; i += 3) {
      const x = array[i];
      array[i + 2] = Math.cos(x * 0.05 + time) * 2;
    }

    plane.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      {/* Define the geometry of the ocean as a plane with specified width, height, and segments */}
      <planeGeometry args={[1000, 1000, 100, 100]} />
      
      {/* Apply a physical material to the plane with specified color, roughness, metalness, transmission, and clear coat */}
      <meshPhysicalMaterial
        color={0x73d6f3}
        roughness={0.1}
        metalness={0.3}
        transmission={0.9}
        clearCoat={1}
      />
    </mesh>
  );
};

export default Ocean;
