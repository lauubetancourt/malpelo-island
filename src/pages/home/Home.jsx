import React from "react";
import "./Home.css";
import "../exploration/Exploration.jsx";
import NavBar from "../../components/navbar/NavBar";
import ContentSection from "../../components/home/content/ContentSection";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const islandContent = [
    {
      image: "/images/home/flora.png",
      title: "Flora",
      description: "Un vistazo a la singular flora de la Isla Malpelo",
    },
    {
      image: "/images/home/fauna.png",
      title: "Fauna",
      description: "Conoce la asombrosa fauna de la Isla Malpelo",
    },
    {
      image: "/images/home/datos.png",
      title: "Datos curiosos",
      description: "Curiosidades fascinantes sobre la Isla Malpelo",
    },
  ];

  const problemsContent = [
    {
      image: "/images/home/contaminacion.png",
      title: "Contaminación del agua",
      description: "¿Cómo afecta la contaminación del agua a la Isla Malpelo?",
    },
    {
      image: "/images/home/acidificacion.png",
      title: "Acidificación de los océanos",
      description:
        "¿Cómo afecta la acidificación de los océanos a la Isla Malpelo?",
    },
  ];

  const navigate = useNavigate();

  const handleLearnMoreClick = () => {
    navigate('/Exploration')
  }

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
        <button className="custom_button-blue" onClick={handleLearnMoreClick}>Aprender más</button>
      </div>

      <ContentSection
        title="¡Aprende de las problemáticas ambientales!"
        content={problemsContent}
        backgroundColor="#486ECA"
        titleColor="white"
      />

      <div className="button-container-blue">
        <button className="custom_button-white">Conocer más</button>
        <button className="custom_button-white">Conocer más</button>
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
        <button className="custom_button-blue">Explorar</button>
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
        <button className="custom_button-white">Intentar</button>
      </div>

      <footer className="footer">
        <div className="footer-container">
          {/* Información del Proyecto */}
          <div className="footer-section">
            <div className="footer-image-container">
              <img className="footer-logo" src="/images/home/logo.png" alt="logo" />
            </div>
            <p className="footer-description">
              Este proyecto busca concientizar sobre los problemas de
              contaminación y acidificación de los océanos <br/>con un enfoque en la
              protección de la biodiversidad en la Isla Malpelo.
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 Isla Malpelo. Todos los derechos reservados.</p>
          <a href="#legal">Términos y Condiciones</a> |{" "}
          <a href="#privacidad">Política de Privacidad</a>
        </div>
      </footer>
    </>
  );
};

export default Home;
