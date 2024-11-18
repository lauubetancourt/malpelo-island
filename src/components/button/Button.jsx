import React, { useState } from "react";
import { Html } from "@react-three/drei";
import "./Button.css"

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
      <button className="button-3d"
        style={{
          backgroundColor: isHovered ? hover : color,
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