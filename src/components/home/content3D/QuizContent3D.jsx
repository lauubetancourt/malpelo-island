import "./QuizContent3D.css";
import React from "react";

const QuizContent3D = ({ model }) => {
  return (
    <section className="quiz-experience-section">
      <div className="quiz-experience-container">
        <div className="quiz-experience-right">{model}</div>
      </div>
    </section>
  );
};

export default QuizContent3D;
