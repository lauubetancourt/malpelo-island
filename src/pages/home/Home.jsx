import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import ContentSection from "../../components/home/content/ContentSection";
import Footer from "../../components/home/footer/Footer.jsx";
import {
  useIslandContent,
  useProblemsContent,
  useQuizContent,
} from "./content.jsx";
import Content3D from "../../components/home/content3D/Content3D.jsx";
import StingrayComponent from "../../components/home/content3D/StingrayComponent.jsx";
import QuestionBoxComponent from "../../components/home/content3D/QuestionBoxComponent.jsx";
import SaveTextComponent from "../../components/home/content3D/SaveTextComponent.jsx";

const Home = () => {
  const navigate = useNavigate();
  const IslandContent = useIslandContent();
  const ProblemsContent = useProblemsContent();
  const QuizContent = useQuizContent();

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

      <Content3D
        title="¡Descubre la Isla Malpelo!"
        model={<StingrayComponent />}
      />

      <ContentSection content={IslandContent} />

      <Content3D
        title="¡Aprende sobre las problemáticas ambientales!"
        model={<SaveTextComponent />}
      />

      <ContentSection content={ProblemsContent} />

      <Content3D
        title="¡Pon a prueba tus conocimientos!"
        model={<QuestionBoxComponent />}
      />

      <ContentSection content={QuizContent} />

      <Footer bgcolor={"#486ECA"} color={"white"} />
    </>
  );
};

export default Home;
