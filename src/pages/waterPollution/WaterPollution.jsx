import { Suspense, useMemo, useRef, useCallback, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Ocean } from "../../figures/waterPollutionScene/Ocean";
import {
  OrbitControls,
  KeyboardControls,
  PositionalAudio,
} from "@react-three/drei";
import "./WaterPollution.css";
import TitleText from "../../figures/waterPollutionScene/TitleText";
import Ligths from "./lights/Ligths";
import { cameraSettings } from "./content";
import Staging from "./staging/Staging";
import LoaderComponent from "./loader/LoaderComponent";
import { Physics } from "@react-three/rapier";
import PostProcessing from "./postprocessing/PostProcessing";
import { Alligator } from "../../figures/wetLand/Alligator";
import { WaterLilly } from "../../figures/wetLand/WaterLilly";
import { Tortoise } from "../../figures/wetLand/Tortoise";
import { PondWeed } from "../../figures/wetLand/PondWeed";
import { Mullet } from "../../figures/wetLand/Mullet";
import NavBar from "../../components/navbar/NavBar";
import WetlandHud from "../../features/wetland/ui/WetlandHud";
import {
  INITIAL_CONTROLS,
  clamp,
  getTGSInsights,
  useWetlandSimulation,
} from "../../features/wetland/simulation";

const WaterPollution = () => {
  const audioRef = useRef();
  const [controls, setControls] = useState(INITIAL_CONTROLS);
  const { state, setManualTime, resetState } = useWetlandSimulation(controls);
  const insights = useMemo(
    () => getTGSInsights(state, controls),
    [state, controls],
  );

  const handleAudio = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.play();
    audioRef.current.setVolume(5);
  }, []);

  const map = useMemo(
    () => [
      { name: "forward", keys: ["ArrowLeft", "KeyA"] },
      { name: "up", keys: ["ArrowUp", "KeyW"] },
      { name: "down", keys: ["ArrowDown", "KeyS"] },
      { name: "bite", keys: ["Space"] },
    ],
    [],
  );

  const generateLilyZone = (count, minX, maxX, minZ, maxZ, minDist) => {
    const generated = [];
    let attempts = 0;
    const maxAttempts = count * 100;

    while (generated.length < count && attempts < maxAttempts) {
      attempts++;
      const x = minX + Math.random() * (maxX - minX);
      const z = minZ + Math.random() * (maxZ - minZ);
      const y = 0.5;

      let isTooClose = false;
      for (let i = 0; i < generated.length; i++) {
        const dx = generated[i].position[0] - x;
        const dz = generated[i].position[2] - z;
        if (Math.sqrt(dx * dx + dz * dz) < minDist) {
          isTooClose = true;
          break;
        }
      }

      if (!isTooClose) {
        generated.push({
          position: [x, y, z],
          rotation: [0, Math.random() * Math.PI * 2, 0],
          scale: 60 + Math.random() * 80,
        });
      }
    }
    return generated;
  };

  const liliesZone1 = useMemo(
    () => generateLilyZone(40, 20, 0, -20, 20, 8),
    [],
  );
  const liliesZone2 = useMemo(
    () => generateLilyZone(40, -20, 20, 15, 35, 8),
    [],
  );

  const lillyCount = 30;
  const liliesProps = useMemo(() => {
    return Array.from({ length: lillyCount }).map(() => ({
      position: [(Math.random() - 0.5) * 40, 0.5, (Math.random() - 0.5) * 40],
      rotation: [0, Math.random() * Math.PI * 2, 0],
      scale: 60 + Math.random() * 80,
    }));
  }, []);

  const fishSpawns = useMemo(
    () => [
      { position: [10, 12, 0], scale: 0.2 },
      { position: [10, 8, 10], scale: 0.2 },
      { position: [7, 10, -8], scale: 0.18 },
    ],
    [],
  );

  const visibleFishCount = useMemo(
    () =>
      Math.max(
        0,
        Math.min(fishSpawns.length, Math.round(state.fishHealth / 34)),
      ),
    [state.fishHealth, fishSpawns.length],
  );

  const waterColor = useMemo(() => {
    const hue = clamp(170 - state.salinity * 0.6, 110, 190);
    const saturation = clamp(35 + state.algae * 0.35, 30, 80);
    const lightness = clamp(30 + state.oxygen * 0.22, 24, 58);
    return `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(
      lightness,
    )}%)`;
  }, [state.salinity, state.algae, state.oxygen]);

  const sandColor = useMemo(() => {
    const hue = 32;
    const saturation = clamp(26 + state.algae * 0.2, 22, 46);
    const lightness = clamp(24 + state.flushing * 0.1, 20, 38);
    return `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(
      lightness,
    )}%)`;
  }, [state.algae, state.flushing]);

  const mainLightIntensity = useMemo(
    () => 30 + state.ecosystemHealth * 0.5,
    [state.ecosystemHealth],
  );

  const applyPreset = useCallback((presetControls) => {
    setControls((previousState) => ({
      ...previousState,
      ...INITIAL_CONTROLS,
      ...presetControls,
    }));
  }, []);

  const handleReset = useCallback(() => {
    setControls({ ...INITIAL_CONTROLS });
    resetState();
  }, [resetState]);

  return (
    <>
      <NavBar />
      <div className="water-pollution-container">
        <WetlandHud
          controls={controls}
          setControls={setControls}
          state={state}
          setManualTime={setManualTime}
          onPreset={applyPreset}
          onReset={handleReset}
          insights={insights}
        />

        <KeyboardControls map={map}>
          <Canvas shadows camera={cameraSettings} onClick={handleAudio}>
            <Suspense fallback={<LoaderComponent />}>
              <OrbitControls
                enableZoom={true}
                enablePan={false}
                maxPolarAngle={Math.PI / 2.5}
                minDistance={0}
                maxDistance={20}
              />
              <PostProcessing />
              <Ligths />
              <Staging />
              <Physics gravity={[0, 0, 0]}>
                {fishSpawns.slice(0, visibleFishCount).map((spawn, index) => (
                  <Mullet
                    key={`mullet-${index}`}
                    position={spawn.position}
                    scale={spawn.scale}
                  />
                ))}

                <group position={[0, 0, 0]}>
                  <pointLight
                    position={[-10, 3, 2]}
                    intensity={mainLightIntensity}
                    color="#fff6e5"
                    distance={60}
                    decay={1.5}
                  />

                  <Alligator scale={2} />
                </group>

                {liliesZone1.map((props, index) => (
                  <WaterLilly
                    key={`zone1-${index}`}
                    position={props.position}
                    rotation={props.rotation}
                    scale={props.scale}
                  />
                ))}

                {liliesZone2.map((props, index) => (
                  <WaterLilly
                    key={`zone2-${index}`}
                    position={props.position}
                    rotation={props.rotation}
                    scale={props.scale}
                  />
                ))}

                {liliesProps.map((props, index) => (
                  <WaterLilly
                    key={index}
                    position={props.position}
                    rotation={props.rotation}
                    scale={props.scale}
                  />
                ))}

                <Tortoise
                  scale={0.1}
                  rotation={[0, 100, 0]}
                  position={[-5, 1, -16]}
                />

                <PondWeed
                  scale={400}
                  rotation={[0, 10, 0]}
                  position={[10, 0.3, 20]}
                />

                <PondWeed
                  scale={300}
                  rotation={[0, 10, 0]}
                  position={[10, 0.3, -20]}
                />

                <PondWeed
                  scale={350}
                  rotation={[0, 10, 0]}
                  position={[13, 0.3, -20]}
                />

                <TitleText />
                <Ocean waterColor={waterColor} sandColor={sandColor} />
              </Physics>

              <group>
                <PositionalAudio
                  ref={audioRef}
                  loop
                  url="/sounds/underwater.mp3"
                  distance={5}
                />
              </group>
            </Suspense>
          </Canvas>
        </KeyboardControls>
      </div>
    </>
  );
};

export default WaterPollution;
