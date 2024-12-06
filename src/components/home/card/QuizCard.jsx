import React from 'react';
import './QuizCard.css';

const QuizCard = ({ image, title, description, action }) => {
  return (
    <div className="quiz-card" onClick={action}>
      <img className="quiz-card-image" src={image} alt={title} />
      <div className="quiz-card-content">
        <h2 className="quiz-card-title">{title}</h2>
        <p className="quiz-card-description">{description}</p>
      </div>
    </div>
  );
};

export default QuizCard;
