import React from "react";
import Section from "../section/Section";  
import './contentSection.css';

const ContentSection = ({ name, content, backgroundColor, nameColor, reverse }) => {
  return (
    <section
      style={{ backgroundColor: backgroundColor, color: nameColor}}
    >
      <div>
        {content.map((item, index) => (
          <Section
            key={index}
            image={item.image}
            name={item.name}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ContentSection;
