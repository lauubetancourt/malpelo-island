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
import AlligatorComponent from "../../components/home/content3D/AlligatorComponent.jsx";
import TortoiseComponent from "../../components/home/content3D/TortoiseComponent.jsx";
import WaterLillyComponent from "../../components/home/content3D/WaterLillyComponent.jsx";
import WetlandContent from "../../components/home/wetlandContent/WetlandContent.jsx";
import {
    wetlandIntro,
    wetlandTypes,
    wetlandVegetation,
    tgsIntro,
    tgsWhySystem,
    tgsCharacteristics,
    tgsSubsystems,
    cienegaIntro,
    cienegaDynamics,
    cienegaCrisis,
    cienegaBiogeochemistry,
    tgsPrinciples,
    feedbackData,
    bibliographyData,
} from "./wetlandData.js";

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
                        alt="Los Humedales"
                        autoPlay
                        loop
                        muted
                        playsInline
                    />
                </div>
                <h1 className="home-imagery_island-text">Los Humedales</h1>
                <h2 className="home-imagery_location-text"> La Ciénaga Grande de Santa Marta </h2>
                <span className="home-imagery_location">
                </span>
                <h2 className="home-imagery_location-text">
                    
                </h2>
            </section>

            {/* ── Section 1: ¿Qué son los Humedales? ── */}
            <Content3D
                title="¿Qué son los Humedales?"
            />

            <WetlandContent {...wetlandIntro} />
            <WetlandContent {...wetlandTypes} className="wetland-section--white" />
            <WetlandContent {...wetlandVegetation} />

            {/* ── Section 2: Los Humedales desde la TGS ── */}
            <Content3D
                title="Los Humedales desde la Teoría General de Sistemas"
            />

            <WetlandContent {...tgsIntro} />
            <WetlandContent {...tgsWhySystem} className="wetland-section--white" />
            <WetlandContent {...tgsCharacteristics} className="wetland-section--light-blue" />
            <WetlandContent {...tgsSubsystems} />

            {/* ── Section 3: Ciénaga Grande de Santa Marta ── */}
            <Content3D
                title="La Ciénaga Grande de Santa Marta"
            />

            <WetlandContent {...cienegaIntro} />
            <WetlandContent {...cienegaDynamics} className="wetland-section--white" />
            <WetlandContent {...cienegaCrisis} />
            <WetlandContent {...cienegaBiogeochemistry} className="wetland-section--white" />

            {/* ── Section 4: Principios de la TGS ── */}
            <Content3D
                title="Principios de la TGS en la Ciénaga Grande"
            />

            <WetlandContent {...tgsPrinciples} className="wetland-section--light-blue" />
            <WetlandContent {...bibliographyData} />
        </>
    );
};

export default Home;
