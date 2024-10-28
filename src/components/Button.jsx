import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";

const Button = ({ onClick, position, text, color, hover }) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const meshRef = useRef();

  useFrame(() => {
    meshRef.current.scale.set(active ? 1.1 : hovered ? 1.05 : 1, 1, 1);
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={[0, -Math.PI / 2, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
        setActive(true);
        setTimeout(() => setActive(false), 150);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[4, 1, 0.2]} />
      <meshStandardMaterial color={hovered ? hover : color} />
      <Text
        position={[0, 0, 0.15]}
        color="white"
        fontSize={0.4}
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </mesh>
  );
};

export default Button;
