import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import QuizContent from "../../components/home/content/QuizContent.jsx";
import Footer from "../../components/home/footer/Footer.jsx";
import "./Quiz.css"; 
import QuizContent3D from "../../components/home/content3D/QuizContent3D.jsx";
import NumberOneComponent from "../../components/home/content3D/NumberOneComponent.jsx";
import NumberTwoComponent from "../../components/home/content3D/NumberTwoComponent.jsx";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />

      <div className="quiz-container">
        <p className="quiz-container-title"> Quizzes </p>
        <h2 className="quiz-subtitle-text" >¡Pon a prueba tus conocimientos con estos divertidos y <br></br> desafiantes quizzes!</h2>
      </div>

      <div className="quiz-content-wrapper">
        <div className="quiz-content-item">
          <QuizContent3D
            model={<NumberOneComponent />}
          />
          <QuizContent3D
            model={<NumberTwoComponent />}
          />
        </div>

        <QuizContent
          content={[
            {
              image: "/images/home/recycleQuiz.png",
              title: "Contaminación del agua",
              description:
                "Conoce qué acciones nos ayudarán a mejorar la contaminación en los océanos",
              action: () => navigate("/quiz-contamination"),
            },
            {
              image: "/images/home/acidificationQuiz.png",
              title: "Acidificación de los océanos",
              description:
                "Evalúa los conocimientos adquiridos acerca de esta problemática",
              action: () => navigate("/quiz-acidification"),
            },
          ]}
        />
      </div>

      <Footer bgcolor={"#486ECA"} color={"white"} />
    </>
  );
};

export default Home;
