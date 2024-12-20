import { Suspense, useState, useMemo, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { Ocean } from "../../figures/waterPollutionScene/Ocean";
import {
  OrbitControls,
  KeyboardControls,
  PositionalAudio,
} from "@react-three/drei";
import "./WaterPollution.css";
import NeonFish from "../../figures/waterPollutionScene/NeonFish";
import { Shark } from "../../figures/waterPollutionScene/Shark";
import TitleText from "../../figures/waterPollutionScene/TitleText";
import { Bottles } from "../../figures/waterPollutionScene/Bottles";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import Tooltip from "../../components/tooltip/ToolTip";
import Ligths from "./lights/Ligths";
import { WhiteCoral } from "../../figures/waterPollutionScene/WhiteCoral";
import { RedCoral } from "../../figures/waterPollutionScene/RedCoral";
import { Turtle } from "../../figures/waterPollutionScene/Turtle";
import { Crate } from "../../figures/waterPollutionScene/Crate";
import {
  cameraSettings,
  itemsWithTooltip,
  modalContent,
  mouseControls,
  keyControls,
} from "./content";
import Staging from "./staging/Staging";
import LoaderComponent from "./loader/LoaderComponent";
import NavBar from "../../components/navbar/NavBar";
import { Physics } from "@react-three/rapier";
import EventsInfo from "../../components/eventsInfo/EventsInfo";
import { Crab } from "../../figures/waterPollutionScene/Crab";
import { Tire } from "../../figures/waterPollutionScene/Tire";
import PostProcessing from "./postprocessing/PostProcessing";


const WaterPollution = () => {
  const audioRef = useRef();

  const handleAudio = useCallback(() => {
    audioRef.current.play();
    audioRef.current.setVolume(5);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tooltip, setTooltip] = useState({
    visible: false,
    icon: "",
    background: "",
    position: { x: 0, y: 0 },
    title: "",
    description: "",
  });

  const handleMouseOver = (event, item) => {
    setTooltip({
      visible: true,
      icon: itemsWithTooltip[item].icon,
      background: itemsWithTooltip[item].background,
      position: { x: event.clientX + 10, y: event.clientY + 10 },
      title: itemsWithTooltip[item].name,
      description: itemsWithTooltip[item].description,
    });
  };

  const handleMouseOut = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const map = useMemo(() => [
    { name: "forward", keys: ["ArrowLeft", "KeyA"] },
    { name: "up", keys: ["ArrowUp", "KeyW"] },
    { name: "down", keys: ["ArrowDown", "KeyS"] },
    { name: "bite", keys: ["Space"] },
  ]);

  return (
    <div className="water-pollution-container">
      <NavBar />
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
              <NeonFish
                scale={0.4}
                onPointerOver={(event) => handleMouseOver(event, "neonFish")}
                onPointerOut={handleMouseOut}
              />
              <Crab
                scale={6}
                rotation={[0, 30, 0]}
                position={[0.5, 2.8, 6.8]}
                onPointerOver={(event) => handleMouseOver(event, "crab")}
                onPointerOut={handleMouseOut}
              />
              <Shark
                scale={8}
                onPointerOver={(event) => handleMouseOver(event, "shark")}
                onPointerOut={handleMouseOut}
              />
              <Bottles
                rotation={[0, 30, 0]}
                position={[-3, 0.3, 6]}
                onPointerOver={(event) => handleMouseOver(event, "bottles")}
                onPointerOut={handleMouseOut}
              />
              <Bottles
                rotation={[0, 11.5, 0]}
                position={[-10, 0.5, -6]}
                onPointerOver={(event) => handleMouseOver(event, "bottles")}
                onPointerOut={handleMouseOut}
              />
              <Turtle
                onPointerOver={(event) => handleMouseOver(event, "turtle")}
                onPointerOut={handleMouseOut}
              />
              <WhiteCoral
                position={[2, 2, 10]}
                onPointerOver={(event) => handleMouseOver(event, "coral")}
                onPointerOut={handleMouseOut}
              />
              <WhiteCoral
                position={[-2, 2, 35]}
                onPointerOver={(event) => handleMouseOver(event, "coral")}
                onPointerOut={handleMouseOut}
              />
              <RedCoral
                rotation={[0, 30, 0]}
                position={[-7, 0.3, -12]}
                onPointerOver={(event) => handleMouseOver(event, "coral")}
                onPointerOut={handleMouseOut}
              />
              <RedCoral
                rotation={[0, 10, 0]}
                position={[0, 0.3, 12]}
                onPointerOver={(event) => handleMouseOver(event, "coral")}
                onPointerOut={handleMouseOut}
              />
              <Crate
                rotation={[0.8, 30, 0]}
                position={[-6, -6, -2]}
                onPointerOver={(event) => handleMouseOver(event, "crate")}
                onPointerOut={handleMouseOut}
              />
              <Tire
                scale={0.2}
                rotation={[0, 10, 80]}
                onPointerOver={(event) => handleMouseOver(event, "tire")}
                onPointerOut={handleMouseOut}
              />
              <TitleText />

              <Button
                position={[0, 3, 0]}
                text="Conocer más"
                color="#6A0DAD"
                onClick={() => setIsModalOpen(true)}
                hover="#8A2BE2"
              />
              <Ocean />
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={modalContent}
      />

      {tooltip.visible && (
        <Tooltip
          icon={tooltip.icon}
          background={tooltip.background}
          position={tooltip.position}
          title={tooltip.title}
          description={tooltip.description}
          className={tooltip.visible ? "visible" : ""}
        />
      )}

      <EventsInfo mouseControls={mouseControls} keyControls={keyControls} />
    </div>
  );
};

export default WaterPollution;
