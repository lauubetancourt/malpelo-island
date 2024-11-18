import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, content }) => {
  const [pageIndex, setPageIndex] = useState(0);

  if (!isOpen) return null;

  const goToPrevious = () => {
    setPageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const goToNext = () => {
    setPageIndex((prevIndex) => (prevIndex < content.length - 1 ? prevIndex + 1 : prevIndex));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
        <div className="modal-content">
          <h2 className="modal-title">{content[pageIndex].title}</h2>
          <p className="modal-description">{content[pageIndex].description}</p>
        </div>
        <div className="modal-navigation">
          <button
            className="modal-arrow"
            onClick={goToPrevious}
            disabled={pageIndex === 0} // Deshabilita si estás en la primera página
          >
            Anterior
          </button>
          <button
            className="modal-arrow"
            onClick={goToNext}
            disabled={pageIndex === content.length - 1} // Deshabilita si estás en la última página
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
