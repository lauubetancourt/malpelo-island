import {
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

const PostProcessing = () => {
  return (
    <EffectComposer>
      <Bloom
        intensity={0.5}
        luminanceThreshold={0.4}
        luminanceSmoothing={0.9}
      />
    </EffectComposer>
  );
};

export default PostProcessing;
