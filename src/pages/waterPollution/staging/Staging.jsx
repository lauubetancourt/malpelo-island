import { Sparkles } from "@react-three/drei";

const Staging = ({
  backgroundColor = "#1f3318",
  fogColor = "#1f3318",
  fogNear = 5,
  fogFar = 50,
  sparkleCount = 800,
  sparkleOpacity = 0.2,
  sparkleColor = "#a4b587",
}) => {
  return (
    <>
      <color attach="background" args={[backgroundColor]} />
      <fog attach="fog" args={[fogColor, fogNear, fogFar]} />
      <Sparkles
        count={sparkleCount}
        scale={[40, 15, 40]}
        size={3}
        speed={0.2}
        opacity={sparkleOpacity}
        color={sparkleColor}
      />
    </>
  );
};

export default Staging;
