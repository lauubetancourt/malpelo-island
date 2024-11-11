import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';

function Bubbles() {
  // Genera burbujas en un rango más amplio
  const bubbles = Array.from({ length: 500 }, () => ({
    position: [
      (Math.random() - 0.5) * 50, // Aumenta el rango X para expandir a los lados
      (Math.random() - 0.5) * 50, // Aumenta el rango Y para cubrir más arriba y abajo
      (Math.random() - 0.5) * 50, // Aumenta el rango Z para dar profundidad
    ],
    scale: Math.random() * 0.3 + 0.1, // Tamaño de cada burbuja
  }));

  return bubbles.map((bubble, i) => {
    const bubbleRef = useRef();

    // Actualización de cada burbuja para que suban en Y
    useFrame(() => {
      if (bubbleRef.current) {
        bubbleRef.current.position.y += 0.02;
        if (bubbleRef.current.position.y > 10) bubbleRef.current.position.y = -10; // Restaura la posición cuando sube demasiado
      }
    });

    return (
      <Sphere
        key={i}
        ref={bubbleRef}
        position={bubble.position}
        scale={bubble.scale}
        args={[1, 16, 16]}
      >
        <meshStandardMaterial color="lightblue" opacity={0.5} transparent />
      </Sphere>
    );
  });
}

export default Bubbles;
