import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Ocean } from "../../figures/waterPollutionScene/Ocean";
import { OrbitControls, Loader } from "@react-three/drei";
import "./WaterPollution.css";
import NeonFish from "../../figures/waterPollutionScene/NeonFish";
import Shark from "../../figures/waterPollutionScene/Shark";
import StripedFish from "../../figures/waterPollutionScene/StripedFish";
import TitleText from "../../figures/waterPollutionScene/TitleText";
import { Bottles } from "../../figures/waterPollutionScene/Bottles";
import { Crate } from "../../figures/waterPollutionScene/Crate";
import Button from "../../components/Button";
import Modal from "../../components/modal/Modal";

const WaterPollution = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cameraSettings = {
    position: [-18, 8, 0],
  };
  return (
    <>
      <Canvas camera={cameraSettings}>
        <Suspense fallback={null}>
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.5} />
          <ambientLight intensity={2} />
          <directionalLight position={[10, 10, 0]} intensity={2} />
          <NeonFish position={[13, 8, 20]} />
          <StripedFish rotation={[0, 30, 0]} position={[0, 3, 16]} />
          <NeonFish
            scale={0.4}
            rotation={[0, 30, 0]}
            position={[-3, 2.5, -6]}
          />
          <StripedFish position={[0, 3, -20]} />
          <Shark position={[15, 72, -2]} />
          <Bottles rotation={[0, 30, 0]} position={[-3, 0.3, 6]} />
          <Crate rotation={[0.95, 30, 0]} position={[-6, -6, -2]} />
          <TitleText />
          <Button
            position={[0, 4, 0]}
            text="Conocer más"
            onClick={() => setIsModalOpen(true)}
            color={"#6A0DAD"}
            hover={"#8A2BE2"}
          />
          <Ocean />
        </Suspense>
      </Canvas>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>¿Qué es la contaminación del agua?</h2>
        <br />
        <p>
          La contaminación del agua es la introducción de sustancias nocivas en
          nuestros océanos, ríos y lagos, alterando su calidad y amenazando la
          vida marina.
          <br />
          <br />
          Este fenómeno, causado por actividades humanas como la industria y la
          agricultura, tiene efectos devastadores en ecosistemas frágiles como
          el de la Isla Malpelo.
        </p>
      </Modal>
      <Loader />
    </>
  );
};

export default WaterPollution;
