import React from "react";
import ContentSection from "../content/contentSection";
import './Fauna.css'

const Fauna = () => {

  const faunaContent = [
    {
      index: 0,
      image: "/images/exploration/mantarraya.webp",
      name: "Mantarrayas gigantes (Manta birostris)",
      description: "Estas majestuosas rayas, también conocidas como mantas oceánicas, pueden alcanzar hasta 7 metros de envergadura y son famosas por sus saltos y movimientos elegantes en el agua. Las mantarrayas se congregan en las aguas de Malpelo para alimentarse de plancton y visitan estaciones de limpieza donde pequeños peces, como los lábridos, eliminan parásitos de sus cuerpos, contribuyendo así a su salud."
    },
    {
      index: 1,
      image: "/images/exploration/ballena.jpg",
      name: "Ballenas jorobadas (Megaptera novaeangliae)",
      description: "Las ballenas jorobadas migran cada año desde sus áreas de alimentación en el sur hasta las aguas tropicales cerca de Malpelo para reproducirse. Estas ballenas, conocidas por sus impresionantes saltos y complejos cantos, suelen verse cerca de la isla entre julio y octubre. Su presencia contribuye a la biodiversidad marina de la región y a la cadena alimenticia del ecosistema local."
    },
    {
      index: 2,
      image: "/images/exploration/martillo.jpg",
      name: "Tiburón martillo (Sphyrna lewini)",
      description: "El tiburón martillo es una de las especies más emblemáticas en las aguas de Malpelo. Con sus características cabezas en forma de martillo, estos tiburones forman grandes cardúmenes alrededor de la isla, especialmente cerca de la formación rocosa conocida como el “Arrecife de Malpelo”. Son una especie en peligro de extinción, por lo que su conservación en esta área es crucial."
    },
    {
      index: 3,
      image: "/images/exploration/tiburonBallena.jpg",
      name: "Tiburón ballena (Rhincodon typus)",
      description: "Aunque menos común, el tiburón ballena, el pez más grande del mundo, también se observa en las aguas de Malpelo. Se trata de un animal filtrador que se alimenta principalmente de plancton. A pesar de su tamaño, el tiburón ballena es inofensivo para el ser humano y su presencia es un indicador de la rica disponibilidad de nutrientes en el área."
    },
    {
      index: 4,
      image: "/images/exploration/peces.jpg",
      name: "Peces pelágicos (tiburones sedosos, atunes y jureles)",
      description: "Las aguas de Malpelo también albergan otros peces pelágicos como los tiburones sedosos (Carcharhinus falciformis), el atún aleta amarilla (Thunnus albacares) y los jureles (Caranx spp.). Estos peces realizan migraciones y son esenciales para el ecosistema local, donde cumplen roles importantes como depredadores y presas en la cadena trófica."
    },
    {
      index: 5,
      image: "/images/exploration/tortugas.jpg",
      name: "Tortugas marinas",
      description: "Varias especies de tortugas marinas, incluyendo la tortuga verde (Chelonia mydas) y la tortuga carey (Eretmochelys imbricata), se encuentran ocasionalmente en las aguas alrededor de Malpelo. Aunque no anidan en la isla, las aguas ricas en nutrientes proporcionan alimento y refugio durante sus migraciones."
    },
  ];

  return (
    <>
      <div className="fauna-container">
      <p className="fauna-container-title"> Fauna </p>
      </div>
  
      <ContentSection
        content={faunaContent}
        backgroundColor="white"
        nameColor="white"
      />
     
    </>
  );
};

export default Fauna;
