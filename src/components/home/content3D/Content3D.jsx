import "./Content3D.css";
import React from "react";

const Content3D = ({ title, model }) => {
  return (
    <section className="experience-section">
      <div className="experience-container">
        <div className="experience-left">
          <h2 className="experience-title">{title}</h2>
        </div>
        <div className="experience-right">{model}</div>
      </div>
    </section>
  );
};

export default Content3D;
