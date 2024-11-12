import { Suspense, useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Ocean } from "../../figures/waterPollutionScene/Ocean";
import { OrbitControls,  KeyboardControls } from "@react-three/drei";
import "./WaterPollution.css";
import NeonFish from "../../figures/waterPollutionScene/NeonFish";
import Shark from "../../figures/waterPollutionScene/Shark";
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
import { cameraSettings, itemsWithTooltip, modalContent } from "./content";
import { useNavigate } from "react-router-dom";
import Staging from "./staging/Staging";
import LoaderComponent from "./loader/LoaderComponent";

const WaterPollution = () => {
  const navigate = useNavigate();
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

  const buttonContent = [
    {
      position: [0, 4, 0],
      text: "Conocer más",
      color: "#6A0DAD",
      onClick: () => setIsModalOpen(true),
      hover: "#8A2BE2",
    },
    {
      position: [0, 2.5, 0],
      text: "Volver al inicio",
      color: "#6A0DAD",
      onClick: () => navigate("/inicio"),
      hover: "#8A2BE2",
    },
  ];

  const map = useMemo(() => [
    { name: "forward", keys: ["ArrowRight", "KeyD"] },
    { name: "back", keys: ["ArrowLeft", "KeyA"] },
    { name: "up", keys: ["ArrowUp", "KeyW"] },
    { name: "down", keys: ["ArrowDown", "KeyS"] },
  ]);

  return (
    <>
    <KeyboardControls map={map}>

      <Canvas shadows camera={cameraSettings}>
        <Suspense fallback={<LoaderComponent/>}>
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.5} />
          <Ligths />
          <Staging/>
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
            position={[15, 72, -2]}
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
            position={[-7, 0.3, -6]}
            onPointerOver={(event) => handleMouseOver(event, "bottles")}
            onPointerOut={handleMouseOut}
          />
          <Turtle
            position={[-10, 3, -8]}
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

          {buttonContent.map((item, index) => (
            <Button
              key={index}
              position={item.position}
              text={item.text}
              onClick={item.onClick}
              color={item.color}
              hover={item.hover}
            />
          ))}
          <Ocean />
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
    </>
  );
};

export default WaterPollution;
