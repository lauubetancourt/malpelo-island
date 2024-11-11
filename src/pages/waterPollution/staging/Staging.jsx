import { Sparkles } from "@react-three/drei";

const Staging = () => {
  return (
    <Sparkles
      /** Number of particles (default: 100) */
      count={200}
      /** Speed of particles (default: 1) */
      //   speed={1.5}
      /** Opacity of particles (default: 1) */
      opacity={0.5}
      /** Color of particles (default: 100) */
      color="#486ECA"
      /** Size of particles (default: randomized between 0 and 1) */
      size={20}
      /** The space the particles occupy (default: 1) */
      scale={30}
    />
  );
};

export default Staging;
