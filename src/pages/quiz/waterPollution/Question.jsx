import { OrbitControls, PositionalAudio } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { RecyclingBin } from "../../../figures/waterPollutionQuiz/RecyclingBin";
import { PlasticBottle } from "../../../figures/waterPollutionQuiz/PlasticBottle";
import { Apple } from "../../../figures/waterPollutionQuiz/Apple";
import { Suspense, useCallback, useRef, useState } from "react";
import { Banana } from "../../../figures/waterPollutionQuiz/Banana";
import { Chips } from "../../../figures/waterPollutionQuiz/Chips";
import { CoffeeCup } from "../../../figures/waterPollutionQuiz/CoffeeCup";
import { PizzaBox } from "../../../figures/waterPollutionQuiz/PizzaBox";
import { GlassBottle } from "../../../figures/waterPollutionQuiz/GlassBottle";
import { Can } from "../../../figures/waterPollutionQuiz/Can";
import { Eggs } from "../../../figures/waterPollutionQuiz/Eggs";
import Swal from "sweetalert2"; // Importa SweetAlert2
import EventsInfo from "../../../components/eventsInfo/EventsInfo";
import LoaderComponent from "../../waterPollution/loader/LoaderComponent";
import NavBar from "../../../components/navbar/NavBar";
import {
  cameraSettings,
  mouseControls,
  keyControls,
  recyclingRules,
  names,
} from "./content";
import Staging from "./Staging";
import Lights from "./Lights";

const Question = () => {
  const incorrectAudioRef = useRef();
  const correctAudioRef = useRef();
  const [selectedObject, setSelectedObject] = useState(null);
  const [visibleObjects, setVisibleObjects] = useState({
    PlasticBottle: true,
    Apple: true,
    Banana: true,
    Chips: true,
    CoffeeCup: true,
    PizzaBox: true,
    GlassBottle: true,
    Can: true,
    Eggs: true,
  });

  const handleClick = (e) => {
    const clickedName = e.object.name;

    if (recyclingRules[clickedName]) {
      setSelectedObject(clickedName);
      Swal.fire({
        title: "¡Objeto seleccionado!",
        text: `Seleccionaste: ${names[clickedName]}. Ahora selecciona un contenedor.`,
        icon: "info",
      });
    } else if (
      selectedObject &&
      Object.values(recyclingRules).includes(clickedName)
    ) {
      const correctBin = recyclingRules[selectedObject];
      if (clickedName === correctBin) {
        Swal.fire({
          title: "¡Éxito!",
          text: `${names[selectedObject]} correctamente reciclado.`,
          icon: "success",
        });
        handleCorrectAudio();
        setVisibleObjects((prev) => ({
          ...prev,
          [selectedObject]: false,
        }));
        setSelectedObject(null);
      } else {
        Swal.fire({
          title: "¡Error!",
          text: `${names[selectedObject]} no pertenece a este contenedor.`,
          icon: "error",
        });
        handleIncorrectAudio();
      }
    } else if (Object.values(recyclingRules).includes(clickedName)) {
      Swal.fire({
        title: "¡Atención!",
        text: "Primero selecciona un objeto para reciclar.",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "¡Cuidado!",
        text: "¡Esto no es reciclable!",
        icon: "error",
      });
    }
  };

  const handleIncorrectAudio = useCallback(() => {
    if (incorrectAudioRef.current) {
      incorrectAudioRef.current.play();
      incorrectAudioRef.current.setVolume(5);
    }
  }, []);

  const handleCorrectAudio = useCallback(() => {
    if (correctAudioRef.current) {
      correctAudioRef.current.play();
      correctAudioRef.current.setVolume(5);
    }
  }, []);

  return (
    <>
      <NavBar />
      <Canvas camera={cameraSettings}>
        <Suspense fallback={<LoaderComponent />}>
          <Staging />
          <Lights />
          <OrbitControls
            enableZoom={true}
            maxPolarAngle={Math.PI / 2.5}
            minDistance={0}
            maxDistance={20}
          />
          <RecyclingBin
            scale={3}
            rotation={[0, 10.2, 0]}
            position={[7, 0, 7]}
            onClick={(e) => handleClick(e)}
          />

          {visibleObjects.PlasticBottle && (
            <PlasticBottle
              scale={10}
              position={[0, -1, 0]}
              onClick={(e) => handleClick(e)}
            />
          )}
          {visibleObjects.Apple && (
            <Apple
              scale={0.5}
              rotation={[0, 90, 0]}
              position={[-2, 0, -3]}
              onClick={(e) => handleClick(e)}
            />
          )}
          {visibleObjects.Banana && (
            <Banana
              scale={0.018}
              position={[3, 0, 0]}
              onClick={(e) => handleClick(e)}
            />
          )}

          {visibleObjects.Chips && (
            <Chips
              rotation={[1.5, 10, 0.5]}
              position={[-5, 0, 0]}
              onClick={(e) => handleClick(e)}
            />
          )}

          {visibleObjects.CoffeeCup && (
            <CoffeeCup
              rotation={[1.5, 10, 0.5]}
              position={[5, 0, -5]}
              onClick={(e) => handleClick(e)}
            />
          )}
          {visibleObjects.PizzaBox && (
            <PizzaBox
              scale={3}
              position={[-10, 0, -18]}
              onClick={(e) => handleClick(e)}
            />
          )}
          {visibleObjects.GlassBottle && (
            <GlassBottle
              scale={0.05}
              position={[-3, 0, -2]}
              onClick={(e) => handleClick(e)}
            />
          )}
          {visibleObjects.Can && (
            <Can
              scale={0.5}
              position={[-1, 0.4, -6]}
              onClick={(e) => handleClick(e)}
            />
          )}
          {visibleObjects.Eggs && (
            <Eggs
              scale={0.01}
              position={[3, 0, -7]}
              onClick={(e) => handleClick(e)}
            />
          )}

          <group>
            <PositionalAudio
              ref={correctAudioRef}
              url={"/sounds/correct.mp3"}
              distance={5}
              loop={false}
            />
          </group>

          <group>
            <PositionalAudio
              ref={incorrectAudioRef}
              url={"/sounds/incorrect.mp3"}
              distance={5}
              loop={false}
            />
          </group>
        </Suspense>
      </Canvas>
      <EventsInfo mouseControls={mouseControls} keyControls={keyControls} />
    </>
  );
};

export default Question;
