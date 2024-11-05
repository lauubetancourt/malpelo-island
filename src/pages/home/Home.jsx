import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import "../exploration/Exploration.jsx";
import NavBar from "../../components/navbar/NavBar";
import ContentSection from "../../components/home/content/ContentSection";
import Footer from "../../components/home/footer/Footer.jsx";
import { islandContent, problemsContent } from "./content.js";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <section className="home-imagery">
        <div className="home-imagery_video-container">
          <video
            className="home-imagery_video"
            src="/videos/home.mp4"
            alt="Isla Malpelo"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
        <h2 className="home-imagery_welcome-text">Bienvenido a la</h2>
        <h1 className="home-imagery_island-text">Isla Malpelo</h1>
        <span className="home-imagery_location">
          <img
            className="home-imagery_location-icon"
            src="/images/home/location.png"
            alt="Icono de ubicación"
          />
        </span>
        <h2 className="home-imagery_location-text">
          Valle del Cauca, Colombia
        </h2>
      </section>

      <ContentSection
        title="¡Descubre la isla!"
        content={islandContent}
        backgroundColor="white"
        titleColor="#003ABC"
      />
      <div className="button-container">
        <button
          className="custom_button-blue"
          onClick={() => navigate("/isla-malpelo")}
        >
          Aprender más
        </button>
      </div>

      <ContentSection
        title="¡Aprende de las problemáticas ambientales!"
        content={problemsContent}
        backgroundColor="#486ECA"
        titleColor="white"
      />

      <div className="button-container-blue">
        <button
          className="custom_button-white"
          onClick={() => navigate("/contaminacion-del-agua")}
        >
          Conocer más
        </button>
        <button
          className="custom_button-white"
          onClick={() => navigate("/acidificacion-del-oceano")}
        >
          Conocer más
        </button>
      </div>

      <ContentSection
        title="¡Sumérgete en la Isla Malpelo!"
        content={[
          {
            image: "/images/home/3d.png",
            title: "Experiencia 3D",
            description:
              "Disfruta de una experiencia inmersiva en la Isla Malpelo",
          },
        ]}
        backgroundColor="white"
        titleColor="#003ABC"
      />

      <div className="button-container">
        <button
          className="custom_button-blue"
          onClick={() => navigate("/experiencia-3D")}
        >
          Explorar
        </button>
      </div>
      <ContentSection
        title="¡Pon a prueba tus conocimientos!"
        content={[
          {
            image: "/images/home/quiz.png",
            title: "Quiz",
            description:
              "Demuestra tu aprendizaje sobre la Isla Malpelo y las problemáticas ambientales",
          },
        ]}
        backgroundColor="#486ECA"
        titleColor="white"
      />

      <div className="button-container-blue">
        <button
          className="custom_button-white"
          onClick={() => navigate("/quiz")}
        >
          Intentar
        </button>
      </div>

      <Footer/>
    </>
  );
};

export default Home;
