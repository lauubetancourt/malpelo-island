import React from 'react';
import './Card.css';

const Card = ({ image, title, description, action }) => {
  return (
    <div className="card" onClick={action}>
      <img className="card-image" src={image} alt={title} />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  );
};

export default Card;
