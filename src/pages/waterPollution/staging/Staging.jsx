import { Sparkles } from "@react-three/drei";

const Staging = () => {
  return (
    <>
      <color attach="background" args={["#1f3318"]} />
      <fog attach="fog" args={["#1f3318", 5, 50]} />
      <Sparkles
        count={800}
        scale={[40, 15, 40]}
        size={3}
        speed={0.2}
        opacity={0.2}
        color="#a4b587"
      />
    </>
  );
};

export default Staging;
