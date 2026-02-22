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
import { DeadFish } from "../../figures/wetLand/DeadFish";
import NavBar from "../../components/navbar/NavBar";
import WetlandHud from "../../features/wetland/ui/WetlandHud";
import {
  INITIAL_CONTROLS,
  clamp,
  useWetlandSimulation,
} from "../../features/wetland/simulation";

const WaterPollution = () => {
  const audioRef = useRef();
  const [controls, setControls] = useState(INITIAL_CONTROLS);
  const { state, resetState } = useWetlandSimulation(controls);

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

  const liveFishSpawns = useMemo(
    () => [
      { position: [10, 12, 0], scale: 0.2 },
      { position: [10, 8, 10], scale: 0.2 },
      { position: [7, 10, -8], scale: 0.18 },
      { position: [4, 9, 5], scale: 0.16 },
    ],
    [],
  );

  const deadFishSpawns = useMemo(
    () => [
      { position: [2, 12.4, -4], scale: 1.2, phase: 0.2 },
      { position: [-4, 12.8, 6], scale: 0.95, phase: 1.1 },
      { position: [8, 13.1, 2], scale: 1.1, phase: 2.4 },
      { position: [-7, 12.5, -5], scale: 0.9, phase: 3.2 },
    ],
    [],
  );

  const mortalityRatio = useMemo(
    () => clamp((55 - state.fishHealth) / 55, 0, 1),
    [state.fishHealth],
  );

  const visibleLiveFishCount = useMemo(
    () =>
      Math.max(
        0,
        Math.min(liveFishSpawns.length, Math.round(state.fishHealth / 24)),
      ),
    [state.fishHealth, liveFishSpawns.length],
  );

  const visibleDeadFishCount = useMemo(
    () => Math.round(deadFishSpawns.length * mortalityRatio),
    [deadFishSpawns.length, mortalityRatio],
  );

  const vegetationFactor = useMemo(
    () => clamp(1 - Math.max(0, state.salinity - 55) / 45, 0.25, 1),
    [state.salinity],
  );

  const visibleLilyCount = useMemo(
    () => Math.round(liliesProps.length * vegetationFactor),
    [liliesProps.length, vegetationFactor],
  );

  const visibleZone1Count = useMemo(
    () => Math.round(liliesZone1.length * vegetationFactor),
    [liliesZone1.length, vegetationFactor],
  );

  const visibleZone2Count = useMemo(
    () => Math.round(liliesZone2.length * vegetationFactor),
    [liliesZone2.length, vegetationFactor],
  );

  const waterColor = useMemo(() => {
    const hue = clamp(182 - state.salinity * 0.9 - state.algae * 0.2, 92, 188);
    const saturation = clamp(28 + state.algae * 0.42, 24, 82);
    const lightness = clamp(58 - state.algae * 0.3 - (100 - state.oxygen) * 0.22, 18, 58);
    return `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(
      lightness,
    )}%)`;
  }, [state.salinity, state.algae, state.oxygen]);

  const sandColor = useMemo(() => {
    const hue = 32;
    const saturation = clamp(24 + state.algae * 0.18, 18, 42);
    const lightness = clamp(31 + state.flushing * 0.08 - state.algae * 0.1, 18, 38);
    return `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(
      lightness,
    )}%)`;
  }, [state.algae, state.flushing]);

  const backgroundColor = useMemo(() => {
    const hue = clamp(160 - state.algae * 0.28, 95, 168);
    const saturation = clamp(22 + state.algae * 0.2, 18, 55);
    const lightness = clamp(22 + state.oxygen * 0.18, 16, 44);
    return `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(
      lightness,
    )}%)`;
  }, [state.algae, state.oxygen]);

  const fogColor = useMemo(() => {
    const hue = clamp(145 - state.salinity * 0.4, 92, 152);
    const saturation = clamp(18 + state.algae * 0.24, 18, 46);
    const lightness = clamp(18 + state.oxygen * 0.14, 14, 34);
    return `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(
      lightness,
    )}%)`;
  }, [state.salinity, state.algae, state.oxygen]);

  const mainLightIntensity = useMemo(
    () => 18 + state.oxygen * 0.5,
    [state.oxygen],
  );

  const sparkleOpacity = useMemo(
    () => clamp(state.oxygen / 300, 0.05, 0.35),
    [state.oxygen],
  );

  const sparkleCount = useMemo(
    () => Math.round(220 + state.oxygen * 6),
    [state.oxygen],
  );

  const algaeBloomOpacity = useMemo(
    () => clamp((state.algae - 35) / 85, 0, 0.65),
    [state.algae],
  );

  const algaeBloomColor = useMemo(() => {
    const hue = clamp(110 - state.salinity * 0.2, 82, 116);
    const saturation = clamp(38 + state.algae * 0.34, 36, 82);
    const lightness = clamp(24 + state.oxygen * 0.08, 20, 40);
    return `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(
      lightness,
    )}%)`;
  }, [state.salinity, state.algae, state.oxygen]);

  const fogFar = useMemo(
    () => clamp(28 + state.oxygen * 0.35 - state.algae * 0.18, 20, 55),
    [state.oxygen, state.algae],
  );

  const fogNear = useMemo(
    () => clamp(3 + state.algae * 0.02, 2, 8),
    [state.algae],
  );

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
          onReset={handleReset}
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
              <Staging
                backgroundColor={backgroundColor}
                fogColor={fogColor}
                fogNear={fogNear}
                fogFar={fogFar}
                sparkleCount={sparkleCount}
                sparkleOpacity={sparkleOpacity}
                sparkleColor="#d9f2ff"
              />
              <Physics gravity={[0, 0, 0]}>
                {liveFishSpawns.slice(0, visibleLiveFishCount).map((spawn, index) => (
                  <Mullet
                    key={`mullet-${index}`}
                    position={spawn.position}
                    scale={spawn.scale}
                  />
                ))}

                {deadFishSpawns.slice(0, visibleDeadFishCount).map((deadFish, index) => (
                  <DeadFish
                    key={`dead-${index}`}
                    position={deadFish.position}
                    scale={deadFish.scale}
                    phase={deadFish.phase}
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

                {liliesZone1.slice(0, visibleZone1Count).map((props, index) => (
                  <WaterLilly
                    key={`zone1-${index}`}
                    position={props.position}
                    rotation={props.rotation}
                    scale={props.scale}
                  />
                ))}

                {liliesZone2.slice(0, visibleZone2Count).map((props, index) => (
                  <WaterLilly
                    key={`zone2-${index}`}
                    position={props.position}
                    rotation={props.rotation}
                    scale={props.scale}
                  />
                ))}

                {liliesProps.slice(0, visibleLilyCount).map((props, index) => (
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
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.55, 0]}>
                  <planeGeometry args={[74, 74]} />
                  <meshStandardMaterial
                    color={algaeBloomColor}
                    transparent
                    opacity={algaeBloomOpacity}
                    depthWrite={false}
                  />
                </mesh>
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
