import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Loader, KeyboardControls } from "@react-three/drei";
import "./Acidification.css";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import { Ocean } from "../../figures/waterAcidificationScene/Ocean";
import TitleText from "../../figures/waterAcidificationScene/TitleText";
import { useNavigate } from "react-router-dom";
import Bubbles from "../../figures/waterAcidificationScene/Bubbles";
import { Turtle } from "../../figures/waterAcidificationScene/Turtle";
import StripedFish from "../../figures/waterAcidificationScene/StripedFish";
import { BlueWhale } from "../../figures/waterAcidificationScene/BlueWhale";
import { Stingray } from "../../figures/waterAcidificationScene/Stingray";
import { Octopus } from "../../figures/waterAcidificationScene/Octopus";
import Ligths from "./lights/Lights";
import LoaderComponent from "./loader/LoaderComponent";
import { cameraSettings, itemsWithTooltip, modalContent, mouseControls, keyControls} from "./information";
import Tooltip from "../../components/tooltip/ToolTip";
import NavBar from "../../components/navbar/NavBar";
import { Physics } from "@react-three/rapier";
import EventsInfo from "../../components/eventsInfo/EventsInfo";

const Acidification = () => {
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

  const cameraSettings = {
    position: [-18, 8, 0],
  };

  const map = useMemo(() => [
    { name: "forward", keys: ["ArrowRight", "KeyD"] },
    { name: "back", keys: ["ArrowLeft", "KeyA"] },
    { name: "up", keys: ["ArrowUp", "KeyW"] },
    { name: "down", keys: ["ArrowDown", "KeyS"] },
  ]);

  return (
    <div className="acidification-container">
    <NavBar/>
      <KeyboardControls map={map}>
        <Canvas camera={cameraSettings} shadows={true}>
          <Suspense fallback={<LoaderComponent />}>
            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.5} />
            <Bubbles />
            <Ligths />
            <Physics gravity={[0, 0, 0]}>
              <Turtle
                onPointerOver={(event) => handleMouseOver(event, "turtle")}
                onPointerOut={handleMouseOut}
              />
              <StripedFish
                onPointerOver={(event) => handleMouseOver(event, "stripedFish")}
                onPointerOut={handleMouseOut}
              />
              <BlueWhale
                position={[7, 9.5, -4]}
                onPointerOver={(event) => handleMouseOver(event, "blueWhale")}
                onPointerOut={handleMouseOut}
              />
              <Stingray
                position={[-1, 5, 15]}
                scale={[0.012, 0.012, 0.012]}
                rotation={[0, -1, 0]}
                onPointerOver={(event) => handleMouseOver(event, "stingray")}
                onPointerOut={handleMouseOut}
                castShadow
              />
              <Octopus
                position={[1.8, 0.5, -12]}
                rotation={[0.1, -1, 0]}
                onPointerOver={(event) => handleMouseOver(event, "octopus")}
                onPointerOut={handleMouseOut}
              />
              <TitleText />

              <Button
                position={[-2, 4, 0]}
                text="Conocer más"
                onClick={() => setIsModalOpen(true)}
                color={"#051E77"}
                hover={"#0076CC"}
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

export default Acidification;
