import React, { useState } from "react";
import { Html } from "@react-three/drei";

const Button = ({ onClick, position, text, color, hover }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Html
      position={position}
      distanceFactor={10}
      transform
      rotation={[0, 30, 0]}
      zIndexRange={[100, 0]}
    >
      <button
        style={{
          backgroundColor: isHovered ? hover : color,
          color: "white",
          cursor: "pointer",
          transition: "background-color 0.3s",
          userSelect: "none"
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        {text}
      </button>
    </Html>
  );
};

export default Button;