import React from "react";
import "./Exploration.css";
import NavBar from "../../components/navbar/NavBar";
import Footer from "../../components/home/footer/Footer";
import ContentSection from "../../components/exploration/content/contentSection";

const Curious = () => {
  const curiousContent = [
    {
      index: 0,
      image: "/images/curious/ubicacion.webp",
      name: "Ubicación remota",
      description:
        "Se encuentra en el Océano Pacífico, a unos 500 km al oeste de la costa de Colombia, y es la única isla oceánica de su tipo en esta región. Debido a su lejanía, el acceso a la isla está estrictamente controlado.",
    },
    {
      index: 1,
      image: "/images/curious/unesco.webp",
      name: "Patrimonio de la Humanidad",
      description:
        "En 2006, la UNESCO declaró a la Isla Malpelo y sus aguas circundantes como Patrimonio de la Humanidad debido a su importancia ecológica y biodiversidad única. Es también un área marina protegida que abarca más de 8,500 km².",
    },
    {
      index: 2,
      image: "/images/curious/deshabitada.webp",
      name: "Deshabitada y aislada",
      description:
        "La isla es completamente deshabitada por humanos, excepto por un pequeño destacamento militar colombiano que se encarga de protegerla. Su paisaje rocoso y escarpado no permite asentamientos permanentes.",
    },
    {
      index: 3,
      image: "/images/curious/cangrejo.webp",
      name: "Supervivencia en condiciones extremas",
      description:
        "Malpelo es famosa por su fauna terrestre adaptada a condiciones hostiles. Por ejemplo, el cangrejo terrestre de Malpelo, una especie endémica, vive en grietas de roca y se alimenta principalmente de guano de aves marinas.",
    },
    {
      index: 4,
      image: "/images/curious/tiburones.webp",
      name: "Santuario de vida marina",
      description:
        "Malpelo es uno de los lugares con mayor diversidad de tiburones en el mundo. Es hogar del tiburón martillo, tiburón ballena, tiburón sedoso y tiburón de Galápagos, entre otros. Además, se ha registrado la presencia de enormes cardúmenes de tiburones martillo, un espectáculo impresionante para los buceadores.",
    },
  ];

  return (
    <>
      <NavBar />
      <div className="fauna-container">
        <p className="fauna-container-title"> Datos curiosos </p>
      </div>

      <ContentSection
        content={curiousContent}
        backgroundColor="white"
        nameColor="#003ABC"
      />
      <Footer bgcolor={"#486ECA"} color={"white"} />
    </>
  );
};

export default Curious;
