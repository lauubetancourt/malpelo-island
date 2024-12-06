import React from "react";
import Card from "../card/QuizCard";
import "./QuizContent.css"

const QuizContent = ({ content }) => {
  return (
    <section
      className="quiz-content-section"
    >
      <div className="quiz-card-container">
        {content.map((item, index) => (
          <Card
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            action={item.action}
          />
        ))}
      </div>
    </section>
  );
};

export default QuizContent;
