import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function DeadFish({
  position = [0, 1, 0],
  scale = 1,
  phase = 0,
  children,
}) {
  const groupRef = useRef(null);
  const baseY = position[1];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.elapsedTime + phase;
    groupRef.current.position.y = baseY + Math.sin(t * 0.6) * 0.08;
    groupRef.current.rotation.z = Math.PI / 2 + Math.sin(t * 0.8) * 0.06;
  });

  const materialProps = useMemo(
    () => ({
      color: "#6b1f1f",
      roughness: 0.85,
      metalness: 0.05,
    }),
    [],
  );

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      rotation={[0, 0, Math.PI / 2]}
    >
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[0.28, 0.65, 6, 12]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh position={[0.45, 0, 0]} castShadow receiveShadow>
        <coneGeometry args={[0.22, 0.35, 10]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh
        position={[-0.3, 0.18, 0]}
        castShadow
        receiveShadow
        rotation={[0, 0, -0.45]}
      >
        <coneGeometry args={[0.08, 0.24, 8]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh
        position={[-0.3, -0.18, 0]}
        castShadow
        receiveShadow
        rotation={[0, 0, 0.45]}
      >
        <coneGeometry args={[0.08, 0.24, 8]} />
        <meshStandardMaterial {...materialProps} />
      </mesh>
      <mesh position={[-0.05, 0.08, 0.21]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      <mesh position={[-0.05, -0.08, 0.21]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>
      {children}
    </group>
  );
}
