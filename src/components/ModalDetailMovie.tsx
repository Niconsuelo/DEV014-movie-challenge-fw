import React, { useState } from "react";
import Modal from "styled-react-modal";
import "../styles/ModalDetailMovie"; // Importa los estilos CSS

// Componente funcional que muestra el modal
const ModalComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="modal-button" onClick={toggleModal}>
        Open modal
      </button>
      <Modal.styled
        isOpen={isOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        style={{ transition: "all 0.3s ease-in-out" }}
      >
        <div className="modal-container">
          <span>I am a modal!</span>
          <button className="modal-button" onClick={toggleModal}>
            Close me
          </button>
        </div>
        
      </Modal.styled>
    </>
  );
};

export default ModalComponent;
