import React from "react";
import ContentSection from "../content/contentSection";
import './Flora.css'

const Flora = () => {
  const floraContent= [
    {
      index: 0,
      image: "/images/exploration/helecho.jpg",
      name:"Helecho Pityrogramma dealbata",
      description: "Este helecho es uno de los pocos elementos de vegetación vascular en Malpelo. Su presencia es notoria en los bordes de las rocas y en áreas que retienen humedad, como los islotes cercanos. Su capacidad para resistir condiciones difíciles le permite desarrollarse en este ambiente, proporcionando refugio a pequeños invertebrados y contribuyendo a la retención de suelo en los terrenos rocosos de la isla.",
    },
    {
      index: 1,
      image: "/images/exploration/caloplaca.jpg",
      name: "Líquenes del género Caloplaca",
      description: "Estos líquenes presentan colores llamativos que van desde tonos anaranjados a amarillentos, y suelen adherirse a superficies rocosas expuestas al sol. En la Isla Malpelo, los Caloplaca cubren áreas que no logran sostener otro tipo de vegetación, y ayudan a proteger la superficie de las rocas, evitando la erosión por factores climáticos."
    },
    {
      index: 2,
      image: "/images/exploration/liquenes.jpg",
      name: "Líquenes del género Candelaria",
      description: "Los líquenes de Candelaria suelen presentarse en tonos verdosos o amarillentos y, aunque son de pequeño tamaño, son una parte importante del ecosistema de Malpelo. Se adhieren principalmente a las rocas y a otras superficies minerales de la isla, absorbiendo la humedad ambiental y sirviendo como una fuente de alimento y refugio para ciertos invertebrados."
    },
    {
      index: 3,
      image: "/images/exploration/lecidea.jpg",
      name: "Líquenes del género Lecidea",
      description: "De aspecto oscuro y con una gran capacidad de adherencia, estos líquenes sobreviven en las áreas más expuestas de la isla. Su resistencia a las condiciones adversas de salinidad y falta de nutrientes les permite prosperar en el ecosistema de Malpelo, contribuyendo a la creación de microhábitats para otras formas de vida pequeñas."
    },
    {
      index: 4,
      image: "/images/exploration/pyxine.jpeg",
      name: "Líquenes del género Pyxine",
      description: "Con una textura que varía entre rugosa y aterciopelada, los líquenes Pyxine suelen presentarse en tonalidades grises o blancas. Este género es especialmente resiliente y se desarrolla en diversas zonas rocosas de Malpelo, donde su crecimiento es lento pero continuo. Proporciona estabilidad a las superficies rocosas y crea pequeños refugios para microorganismos."
    },
  ];


  return (
    <>
      <p className="flora-container-title"> Flora </p>
      <ContentSection 
        content={floraContent}
        backgroundColor="white"
        nameColor="#003ABC"
      />
    </>
  );
};

export default Flora;
