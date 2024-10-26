import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Ocean from "../../figures/waterPollutionScene/Ocean";
import { OrbitControls, Loader } from "@react-three/drei";
import "./WaterPollution.css";
import NeonFish from "../../figures/waterPollutionScene/NeonFish";
import Shark from "../../figures/waterPollutionScene/Shark";
import StripedFish from "../../figures/waterPollutionScene/StripedFish";
import TitleText from "../../figures/waterPollutionScene/TitleText";
import { Bottles } from "../../figures/waterPollutionScene/Bottles";
import { Crate } from "../../figures/waterPollutionScene/Crate";

const WaterPollution = () => {
  const cameraSettings = {
    position: [-15, 10, 0],
  };
  return (
    <>
      <Canvas camera={cameraSettings}>
        <Suspense fallback={null}>
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 3} />
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 0]} intensity={2} />
          <NeonFish position={[13, 8, 20]} />
          <StripedFish position={[0, 3, 10]} />
          <NeonFish position={[10, 8, -15]} />
          <StripedFish position={[5, 3, -20]} />
          <Shark position={[10, 30, 0]} />
          <Bottles rotation={[0, 30, 0]} position={[-3, 0.3, 6]} />
          <Crate rotation={[0.95, 30, 0]} position={[-6, -6, -2]} />
          <TitleText />
          <Ocean />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
};

export default WaterPollution;
