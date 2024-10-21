import React from "react";
import Card from "../card/Card";
import "./ContentSection.css"

const ContentSection = ({ title, content, backgroundColor, titleColor }) => {
  return (
    <section
      className="home-content-section"
      style={{ backgroundColor: backgroundColor}}
    >
      <h2 style={{ color: titleColor }}>{title}</h2>
      <div className="content_card-container">
        {content.map((item, index) => (
          <Card
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ContentSection;
