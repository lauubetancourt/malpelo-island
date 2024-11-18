import React from "react";
import Card from "../card/Card";
import "./ContentSection.css"

const ContentSection = ({ content }) => {
  return (
    <section
      className="home-content-section"
    >
      <div className="content_card-container">
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

export default ContentSection;
