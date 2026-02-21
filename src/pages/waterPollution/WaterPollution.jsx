import { Suspense, useState, useMemo, useRef, useCallback } from "react";
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
import {
  cameraSettings,
  itemsWithTooltip,
} from "./content";
import Staging from "./staging/Staging";
import LoaderComponent from "./loader/LoaderComponent";
import { Physics } from "@react-three/rapier";
import PostProcessing from "./postprocessing/PostProcessing";
import { Alligator } from "../../figures/wetLand/Alligator";
import { WaterLilly } from "../../figures/wetLand/WaterLilly";
import { Tortoise } from "../../figures/wetLand/Tortoise";
import { PondWeed } from "../../figures/wetLand/PondWeed";
import { Mullet } from "../../figures/wetLand/Mullet";

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
  // 🌿 FUNCIÓN MAESTRA: Generador de Bosques (Reutilizable)
  // minX y maxX definen la profundidad (atrás/adelante)
  // minZ y maxZ definen el ancho (izquierda/derecha)
  const generateLilyZone = (count, minX, maxX, minZ, maxZ, minDist) => {
    const generated = [];
    let attempts = 0;
    const maxAttempts = count * 100; // Evita bucles infinitos

    while (generated.length < count && attempts < maxAttempts) {
      attempts++;

      // Calculamos coordenadas dentro de los límites que le pasemos
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

  // 🌳 ZONA 1: El gran fondo (Detrás del cocodrilo, esparcidos a lo ancho)
  const liliesZone1 = useMemo(() => {
    // 35 plantas | Profundidad X: entre -45 y -5 | Ancho Z: entre -40 y 40 | Distancia: 8
    return generateLilyZone(40, 20, 0, -20, 20, 8);
  }, []);

  // 🌳 ZONA 2: Nueva zona (Ejemplo: A la derecha y un poco más al frente)
  const liliesZone2 = useMemo(() => {
    // 15 plantas | Profundidad X: entre -5 y 15 | Ancho Z: entre 15 y 35 | Distancia: 8
    return generateLilyZone(40, -20, 20, 15, 35, 8);
  }, []);

  // ... (tus otros estados y funciones)

  // 🌿 CONFIGURACIÓN DEL BOSQUE DE LIRIOS
  const lillyCount = 30; // ¿Cuántas plantas quieres? Cambia este número a tu gusto.
  const liliesProps = useMemo(() => {
    return Array.from({ length: lillyCount }).map(() => ({
      // Genera coordenadas X y Z aleatorias entre -20 y +20.
      // La Y se queda en 0.5 (cerca del suelo/agua).
      position: [(Math.random() - 0.5) * 40, 0.5, (Math.random() - 0.5) * 40],

      // Gira la planta aleatoriamente solo en su propio eje Y para que no miren todas al mismo lado
      rotation: [0, Math.random() * Math.PI * 2, 0],

      // Escala aleatoria entre 60 y 140 (para que haya plantas grandes y pequeñas)
      scale: 60 + Math.random() * 80,
    }));
  }, []);

  return (
    <div className="water-pollution-container">
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
              <Mullet
                position={[10, 12, 0]}
                scale={0.2}
                onPointerOver={(event) => handleMouseOver(event, "neonFish")}
                onPointerOut={handleMouseOut}
              />
              <Mullet
                position={[10, 8, 10]}
                scale={0.2}
                onPointerOver={(event) => handleMouseOver(event, "neonFish")}
                onPointerOut={handleMouseOut}
              />
              <group position={[0, 0, 0]}>
                {/* Bombillo más alto y con mayor alcance */}
                <pointLight
                  position={[
                    -10, 3, 2,
                  ]} /* Subimos el bombillo al doble de altura */
                  intensity={80} /* Más fuerza porque ahora está más lejos */
                  color="#fff6e5"
                  distance={
                    60
                  } /* Aumentamos el radio para que abarque la cola y la cabeza */
                  decay={1.5} /* Suavizamos cómo se desvanece la luz */
                />

                <Alligator
                  scale={2}
                  onPointerOver={(event) => handleMouseOver(event, "alligator")}
                  onPointerOut={handleMouseOut}
                />
              </group>
              {liliesZone1.map((props, index) => (
                <WaterLilly
                  key={`zone1-${index}`}
                  position={props.position}
                  rotation={props.rotation}
                  scale={props.scale}
                  onPointerOver={(event) => handleMouseOver(event, "coral")}
                  onPointerOut={handleMouseOut}
                />
              ))}
              {liliesZone2.map((props, index) => (
                <WaterLilly
                  key={`zone2-${index}`}
                  position={props.position}
                  rotation={props.rotation}
                  scale={props.scale}
                  onPointerOver={(event) => handleMouseOver(event, "coral")}
                  onPointerOut={handleMouseOut}
                />
              ))}
              {liliesProps.map((props, index) => (
                <WaterLilly
                  key={index} // React necesita una key única para los elementos en lista
                  position={props.position}
                  rotation={props.rotation}
                  scale={props.scale}
                  // Puedes dejar los eventos del mouse si quieres que al tocarlas salga tooltip
                  onPointerOver={(event) => handleMouseOver(event, "coral")}
                  onPointerOut={handleMouseOut}
                />
              ))}
              <Tortoise
                scale={0.1}
                rotation={[0, 100, 0]}
                position={[-5, 1, -16]}
                onPointerOver={(event) => handleMouseOver(event, "coral")}
                onPointerOut={handleMouseOut}
              />
              <PondWeed
                scale={400}
                rotation={[0, 10, 0]}
                position={[10, 0.3, 20]}
                onPointerOver={(event) => handleMouseOver(event, "coral")}
                onPointerOut={handleMouseOut}
              />
              <PondWeed
                scale={300}
                rotation={[0, 10, 0]}
                position={[10, 0.3, -20]}
                onPointerOver={(event) => handleMouseOver(event, "coral")}
                onPointerOut={handleMouseOut}
              />
              <PondWeed
                scale={350}
                rotation={[0, 10, 0]}
                position={[13, 0.3, -20]}
                onPointerOver={(event) => handleMouseOver(event, "coral")}
                onPointerOut={handleMouseOut}
              />
              <TitleText />
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
    </div>
  );
};

export default WaterPollution;
