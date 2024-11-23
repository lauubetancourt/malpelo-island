import "./EventsInfo.css";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { FaInfoCircle } from "react-icons/fa";

const EventsInfo = ({ mouseControls = [], keyControls = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        className="info-button"
        onClick={toggleModal}
        title="Información de controles"
      >
        <div className="info-button-icon">
          <FaInfoCircle />
        </div>
      </button>

      {isOpen &&
        createPortal(
          <div className="modal-info-overlay" onClick={toggleModal}>
            <div
              className="modal-info-content"
              onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro
            >
              <h3>Controles disponibles</h3>
              <ul>
                <li>
                  <h4>Mouse</h4>
                  <ul>
                    {Array.isArray(mouseControls) &&
                      mouseControls.map((item, index) => (
                        <li key={`mouse-${index}`}>
                          <strong>{item.control}:</strong> {item.description}
                        </li>
                      ))}
                  </ul>
                </li>
                <li>
                  <h4>Teclado</h4>
                  <ul>
                    {Array.isArray(keyControls) &&
                      keyControls.map((item, index) => (
                        <li key={`mouse-${index}`}>
                          <strong>{item.control}:</strong> {item.description}
                        </li>
                      ))}
                  </ul>
                </li>
              </ul>
              <button onClick={toggleModal} className="close-button">
                Cerrar
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default EventsInfo;
