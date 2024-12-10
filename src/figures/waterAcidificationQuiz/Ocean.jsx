import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function Ocean(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/waterAcidificationQuiz/Ocean.glb"
  );
  const { onCoralClick, gameReset  } = props;

  const [corals, setCorals] = useState({
    coral1: {
      state: "healthy",
      position: [-7, -4, -1],
      geometry: nodes.Object_7_1?.geometry,
    },
    coral2: {
      state: "healthy",
      position: [6, -9, 0],
      geometry: nodes.Object_7_2?.geometry,
    },
    coral3: {
      state: "healthy",
      position: [2, -5, -1],
      geometry: nodes.Object_7_3?.geometry,
    },
    coral4: {
      state: "healthy",
      position: [-7, 4, -0.2],
      geometry: nodes.Object_7_4?.geometry,
    },
    coral5: {
      state: "healthy",
      position: [-9, 10, 0.1],
      geometry: nodes.Object_7_5?.geometry,
    },
    coral6: {
      state: "healthy",
      position: [6, -9, 1],
      geometry: nodes.Object_7_7?.geometry,
    },
  });

  useEffect(() => {
    // Reinicia los corales
    setCorals({
      coral1: {
        state: "healthy",
        position: [-7, -4, -1],
        geometry: nodes.Object_7_1?.geometry,
      },
      coral2: {
        state: "healthy",
        position: [6, -9, 0],
        geometry: nodes.Object_7_2?.geometry,
      },
      coral3: {
        state: "healthy",
        position: [2, -5, -1],
        geometry: nodes.Object_7_3?.geometry,
      },
      coral4: {
        state: "healthy",
        position: [-7, 4, -0.2],
        geometry: nodes.Object_7_4?.geometry,
      },
      coral5: {
        state: "healthy",
        position: [-9, 10, 0.1],
        geometry: nodes.Object_7_5?.geometry,
      },
      coral6: {
        state: "healthy",
        position: [6, -9, 1],
        geometry: nodes.Object_7_7?.geometry,
      },
    });
  }, [gameReset]);

  // Material dañado con colores diferentes para corales bleached
  const damagedCoralMaterials = {
    coral1: new THREE.MeshStandardMaterial({
      color: new THREE.Color("#A6CDD2"), // Color gris claro
      roughness: 0.8,
      metalness: 0.2,
    }),
    coral2: new THREE.MeshStandardMaterial({
      color: new THREE.Color("#A7C6C9"), // Otro tono para el coral2
      roughness: 0.6,
      metalness: 0.3,
    }),
    coral3: new THREE.MeshStandardMaterial({
      color: new THREE.Color("#E7FAFF"), // Otro tono para el coral3
      roughness: 0.7,
      metalness: 0.25,
    }),
    coral4: new THREE.MeshStandardMaterial({
      color: new THREE.Color("#B6D8D4"), // Otro tono para el coral4
      roughness: 0.9,
      metalness: 0.1,
    }),
    coral5: new THREE.MeshStandardMaterial({
      color: new THREE.Color("#C7C589"), // Otro tono para el coral5
      roughness: 0.85,
      metalness: 0.15,
    }),
    coral6: new THREE.MeshStandardMaterial({
      color: new THREE.Color("#6C918A"), // Otro tono para el coral6
      roughness: 0.75,
      metalness: 0.2,
    }),
  };

  // Material saludable con colores brillantes
  const healthyCoralMaterials = {
    coral1: new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FF6F61"), // Coral saludable de color brillante
      roughness: 0.4,
      metalness: 0.6,
    }),
    coral2: new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FF8C42"), // Otro tono brillante para el coral2
      roughness: 0.5,
      metalness: 0.7,
    }),
    coral3: new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FFCB45"), // Otro tono brillante para el coral3
      roughness: 0.3,
      metalness: 0.8,
    }),
    coral4: new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FFD700"), // Otro tono brillante para el coral4
      roughness: 0.6,
      metalness: 0.9,
    }),
    coral5: new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FF1493"), // Otro tono brillante para el coral5
      roughness: 0.4,
      metalness: 0.5,
    }),
    coral6: new THREE.MeshStandardMaterial({
      color: new THREE.Color("#32CD32"), // Otro tono brillante para el coral6
      roughness: 0.3,
      metalness: 0.7,
    }),
  };

  // Establecer un temporizador para cambiar el estado de cada coral
  useEffect(() => {
    const coralTimers = Object.keys(corals).map((coralId) => {
      return setInterval(() => {
        setCorals((prevCorals) => {
          const newCorals = { ...prevCorals };
          if (newCorals[coralId].state === "healthy") {
            newCorals[coralId].state = "bleached";
          }
          return newCorals;
        });
      }, Math.random() * 3000 + 1000); // Intervalo aleatorio entre 5 y 15 segundos
    });

    // Limpiar los temporizadores cuando el componente se desmonte
    return () => {
      coralTimers.forEach(clearInterval);
    };
  }, [corals]); // Dependencia de corales para actualizar correctamente cuando cambian

  const handleCoralClick = (coralId) => {
    const coral = corals[coralId];

    if (coral.state === "healthy") {
      onCoralClick("healthy"); // Enviar estado 'healthy' para restar puntos
    } else {
      setCorals((prevCorals) => {
        const { [coralId]: _, ...remainingCorals } = prevCorals;
        return remainingCorals;
      });
      onCoralClick("bleached"); // Enviar estado 'bleached' para sumar puntos
    }
  };

  return (
    <group {...props} dispose={null}>
      <group
        position={[-0.5, 2.6, -1]}
        rotation={[-Math.PI / 2, 0, 2]}
        scale={0.2}
      >
        <mesh geometry={nodes.Watter.geometry} material={materials.Ocean} />

        {/* Renderizar los corales dinámicamente */}
        {Object.entries(corals).map(([coralId, coralData]) => {
          const { state, position, geometry } = coralData;

          const coralMaterial =
            state === "bleached"
              ? damagedCoralMaterials[coralId] // Si está dañado (bleached), se aplica el material dañado
              : healthyCoralMaterials[coralId] ||
                materials[`M_coral_0${Math.random() * 5 + 1}`]; // Si está saludable, se aplica el material brillante
          return (
            <mesh
              key={coralId}
              castShadow
              receiveShadow
              geometry={geometry}
              material={coralMaterial}
              position={position}
              onClick={() => handleCoralClick(coralId)}
            />
          );
        })}

        {/* Otros objetos en la escena */}
        <mesh
          receiveShadow
          geometry={nodes.Object_7.geometry}
          material={materials.Main}
        />
        <mesh
          castShadow
          geometry={nodes.Object_7_1.geometry}
          material={materials["M_coral_02.001"]}
        />
        <mesh
          castShadow
          geometry={nodes.Object_7_2.geometry}
          material={materials["M_coral_01.001"]}
        />
        <mesh
          castShadow
          geometry={nodes.Object_7_3.geometry}
          material={materials["M_coral_02.002"]}
        />
        <mesh
          castShadow
          geometry={nodes.Object_7_4.geometry}
          material={materials["M_coral.001"]}
        />
        <mesh
          castShadow
          geometry={nodes.Object_7_5.geometry}
          material={materials["M_coral.002"]}
        />
        <mesh
          castShadow
          geometry={nodes.Object_7_7.geometry}
          material={materials.M_coral_01}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models-3d/waterAcidificationQuiz/Ocean.glb");
