import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Loader } from "@react-three/drei";
import "./waterAcidification.css";
import Button from "../../components/Button";
import Modal from "../../components/modal/Modal";
import { Ocean } from "../../figures/waterAcidification/Ocean";
import TitleText from "../../figures/waterAcidification/TitleText";
import Shark from "../../figures/waterPollutionScene/Shark";
import { useNavigate } from "react-router-dom";

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
    { title: "¿Cómo ayudar?", description: "Contenido de cómo ayudar..." },
  ];

  return (
    <>
      <Canvas camera={cameraSettings}>
        <Suspense fallback={null}>
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.5} />
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 0]} intensity={2} />
          <Shark position={[15, 72, -2]} />
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
          <Ocean />
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
