import { Suspense, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Ocean } from "../../figures/waterPollutionScene/Ocean";
import { OrbitControls, KeyboardControls } from "@react-three/drei";
import "./WaterPollution.css";
import NeonFish from "../../figures/waterPollutionScene/NeonFish";
import { Shark } from "../../figures/waterPollutionScene/Shark";
import StripedFish from "../../figures/waterPollutionScene/StripedFish";
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

const WaterPollution = () => {
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
    { name: "back", keys: ["ArrowRight", "KeyD"] },
    { name: "up", keys: ["ArrowUp", "KeyW"] },
    { name: "down", keys: ["ArrowDown", "KeyS"] },
    { name: "bite", keys: ["Space"] },
  ]);

  return (
    <div className="water-pollution-container">
      <NavBar />
      <KeyboardControls map={map}>
        <Canvas shadows camera={cameraSettings}>
          <Suspense fallback={<LoaderComponent />}>
            <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2.5} />
            <Ligths />
            <Staging />
            <Physics gravity={[0, 0, 0]}>
              <NeonFish
                scale={0.4}
                rotation={[0, 30, 0]}
                position={[50, 3, -6]}
                onPointerOver={(event) => handleMouseOver(event, "neonFish")}
                onPointerOut={handleMouseOut}
              />
              <StripedFish
                onPointerOver={(event) => handleMouseOver(event, "stripedFish")}
                onPointerOut={handleMouseOut}
              />
              <Shark
                scale={8}
                onPointerOver={(event) => handleMouseOver(event, "shark")}
                onPointerOut={handleMouseOut}
              />
              <Bottles
                rotation={[0, 30, 0]}
                position={[-3, 1.2, 6]}
                onPointerOver={(event) => handleMouseOver(event, "bottles")}
                onPointerOut={handleMouseOut}
              />
              <Bottles
                rotation={[0, 11.5, 0]}
                position={[-10, 1.2, -6]}
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
