import React from "react";
import "./Tooltip.css";

const Tooltip = ({ position, background, icon, title, description }) => {
  return (
    <div
      className="tooltip"
      style={{
        top: position.y,
        left: position.x,
        backgroundColor: background
      }}
    >
      <div className="tooltip-title">{icon}{title}</div>
      <div className="tooltip-description">{description}</div>
    </div>
  );
};

export default Tooltip;
