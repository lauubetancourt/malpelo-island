import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Loader, Environment } from "@react-three/drei";
import "./waterAcidification.css";
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

const WaterAcidification = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cameraSettings = {
    position: [-18, 8, 0],
  };

  const modalContent = [
    {
      title: "¿Qué es la acidificación de los océanos?",
      description:
        "La acidificación de los océanos ocurre cuando el mar absorbe demasiado dióxido de carbono (CO₂), volviendo el agua más ácida. Esto afecta a especies marinas como corales y moluscos, ya que les cuesta formar sus caparazones y estructuras, poniendo en riesgo a todo el ecosistema. La acidificación de los océanos es causada principalmente por el aumento de dióxido de carbono (CO₂) en la atmósfera debido a actividades humanas como la quema de combustibles fósiles (petróleo,carbón y gas), la deforestación y la industria.",
    },
    {
      title: "¿Cómo afecta?",
      description: "Contenido de cómo afecta...",
    },
    { 
      title: "¿Cómo ayudar?", 
      description: "Contenido de cómo ayudar..." 
    },
  ];

  return (
    <>
      <Canvas shadows="soft" camera={cameraSettings}>
        <Suspense fallback={null}>
          
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.5} />
          <ambientLight intensity={1.3} />
          <Ligths />
          <directionalLight 
            castShadow 
            position={[10, 10, 0]} 
            intensity={2} 
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          
          <Bubbles />
          <Turtle position={[-8, 3, -8]} />
          <StripedFish position={[-10, -5, -20]} />
          <BlueWhale position={[7, 9.5, -4]}/>
          <Stingray castShadow position={[-1, 5, 15]} scale={[0.012, 0.012,0.012]} rotation = {[0,-1,0]}/>
          <Octopus  position={[1.8, 0.5, -12]} rotation = {[0.1,-1,0]}/>
          <TitleText />
          <Button
            position={[-2, 4, 0]}
            text="Conocer más"
            onClick={() => setIsModalOpen(true)}
            color={"#051E77"}
            hover={"#0076CC"}
          />
          <Button
            position={[-2, 2.5, 0]}
            text="Volver al inicio"
            onClick={() => navigate("/inicio")}
            color={"#051E77"}
            hover={"#0076CC"}
          />
          <mesh receiveShadow>
            <Ocean/>
          </mesh>
        </Suspense>
      </Canvas>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={modalContent}
      />
      <Loader />
    </>
  );
};

export default WaterAcidification;
